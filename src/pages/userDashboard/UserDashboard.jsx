import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSearch, FaLink, FaDonate, FaRegCopy, FaChartLine, FaHistory, FaCog } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut, FiChevronRight } from 'react-icons/fi';

const UserDashboard = () => {
  const [donationHistory] = useState([
    { id: 1, amount: 50, date: 'Jul 1, 2024', cause: 'Education Fund', status: 'completed' },
    { id: 2, amount: 30, date: 'Jul 15, 2024', cause: 'Healthcare Support', status: 'completed' },
    { id: 3, amount: 100, date: 'Jul 20, 2024', cause: 'Disaster Relief', status: 'completed' },
    { id: 4, amount: 75, date: 'Aug 5, 2024', cause: 'Animal Shelter', status: 'pending' }
  ]);
  
  const [userName, setUserName] = useState('User');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [totalDonated, setTotalDonated] = useState(0);
  const [impactCount, setImpactCount] = useState(0);

  const invitationLink = 'https://donationplatform.com/invite?ref=olivia123';
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/LoginPage');
    } else {
      const storedName = localStorage.getItem('userName');
      if (storedName) setUserName(storedName);
    }

    const total = donationHistory.reduce((sum, donation) => sum + donation.amount, 0);
    setTotalDonated(total);
    
    const timer = setTimeout(() => {
      setImpactCount(12); 
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate, donationHistory]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleMakeDonation = () => {
    navigate('/DonateNowPage');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-6 font-sans">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
      >
        <div className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-lg mr-2">
            DP
          </span>
          Donation Platform
        </div>
        
        <nav className="flex space-x-1 md:space-x-4 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'Home', icon: null, label: 'Home', path:'/' },
            { id: 'analytics', icon: <FaChartLine className="mr-1" />, label: 'Analytics' },
            { id: 'history', icon: <FaHistory className="mr-1" />, label: 'History' },
            { id: 'settings', icon: <FaCog className="mr-1" />, label: 'Settings' }
          ].map((tab) => (
            <button
            key={tab.id}
            onClick={() => {
              if (tab.id === 'Home') {
                navigate('/');
              } else {
                setActiveTab(tab.id);
              }
            }}
              className={`flex items-center px-3 py-1 rounded-md text-sm md:text-base ${activeTab === tab.id ? 'bg-white shadow-sm text-purple-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <FaSearch className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <FaUserCircle className="text-2xl text-purple-600" />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span className="text-gray-800 font-medium group-hover:text-purple-600 transition">
              {userName}
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-red-500 transition"
            title="Log out"
          >
            <FiLogOut className="text-xl" />
          </button>
        </div>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Welcome Back, <span className="text-purple-600">{userName}</span>!
        </h1>
        <p className="text-gray-600">Here's your impact at a glance</p>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="text-gray-500 text-sm">Total Donated</div>
            <div className="text-2xl font-bold text-purple-600 mt-1">
              ${totalDonated.toLocaleString()}
            </div>
            <div className="text-green-500 text-xs mt-1 flex items-center">
              <span>+12% from last month</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="text-gray-500 text-sm">Lives Impacted</div>
            <div className="text-2xl font-bold text-indigo-600 mt-1">
              {impactCount}+
            </div>
            <div className="text-blue-500 text-xs mt-1">Through your generosity</div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="text-gray-500 text-sm">Active Campaigns</div>
            <div className="text-2xl font-bold text-pink-600 mt-1">4</div>
            <div className="text-pink-500 text-xs mt-1">You're supporting</div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 lg:col-span-2"
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Donations</h2>
              <button className="text-sm text-purple-600 hover:underline flex items-center">
                View All <FiChevronRight className="ml-1" />
              </button>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence>
                {donationHistory.map((donation) => (
                  <motion.div
                    key={donation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex justify-between items-center p-4 rounded-lg ${donation.status === 'pending' ? 'bg-yellow-50 border border-yellow-100' : 'bg-gray-50'}`}
                  >
                    <div>
                      <p className="font-medium text-gray-800">{donation.cause}</p>
                      <p className="text-gray-500 text-sm">{donation.date}</p>
                      {donation.status === 'pending' && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                          Processing
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${donation.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                        ${donation.amount}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {donation.status === 'completed' ? 'Completed' : 'Estimated completion: 2 days'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Invite Friends</h2>
            <p className="text-gray-600 text-sm mb-3">
              Share your link and earn rewards when friends donate
            </p>
            
            <div className="flex items-center bg-gray-50 rounded-lg p-2 border border-gray-200">
              <FaLink className="text-gray-400 ml-2" />
              <input
                type="text"
                value={invitationLink}
                readOnly
                className="bg-transparent text-gray-700 text-sm w-full p-2 outline-none truncate"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center bg-purple-50 text-purple-600 px-3 py-1.5 rounded-md text-sm hover:bg-purple-100 transition"
              >
                {copied ? 'Copied!' : (
                  <>
                    <FaRegCopy className="mr-1" /> Copy
                  </>
                )}
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-white mb-3">Make a Difference</h2>
            <p className="text-purple-100 text-sm mb-5">
              Support causes that matter to you and your community
            </p>
            
            <button
              onClick={handleMakeDonation}
              className="w-full flex items-center justify-center space-x-2 bg-white text-purple-600 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              <FaDonate />
              <span>Donate Now</span>
            </button>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="font-medium text-gray-800 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: '📊', label: 'View Impact Report' },
                { icon: '💳', label: 'Update Payment Method' },
                { icon: '🔔', label: 'Notification Settings' },
                { icon: '❤️', label: 'Saved Causes' }
              ].map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 5 }}
                  className="w-full text-left flex items-center p-2 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-xl mr-3">{action.icon}</span>
                  <span className="text-gray-700">{action.label}</span>
                  <FiChevronRight className="ml-auto text-gray-400" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;




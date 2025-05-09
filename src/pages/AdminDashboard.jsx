import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import DonationsManagement from './DonationsManagement.jsx';
import CharitiesManagement from './charitiesManagement.jsx';
import AddCharity from './AddCharity.jsx';
import EditCharity from './EditCharity.jsx';
import DashboardHome from '../admin/DashboardHome.jsx';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/AdminLogin');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/admin/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsAuthenticated(true);
        setAdmin(response.data.admin);
      } catch (err) {
        handleLogout();
      }
    };

    verifyAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/AdminLogin');
  };

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 background-animate">
  
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white bg-opacity-10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative flex h-screen">
        <div className="w-64 bg-black bg-opacity-70 text-white p-6 backdrop-blur-lg border-r border-white border-opacity-10">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
              <span className="text-xl font-bold">A</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-300">
              Charity Hub
            </h1>
          </div>
          
          <nav className="space-y-2">
            <NavLink to="/admin" icon="dashboard" label="Dashboard" />
            <NavLink to="/admin/charities" icon="handshake" label="Charities" />
            <NavLink to="/admin/donations" icon="donation" label="Donations" />
          </nav>
          
          <button 
            onClick={handleLogout}
            className="mt-10 w-full py-2 px-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
          >
            <span>Logout</span>
            <span className="text-sm">→</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<DashboardHome admin={admin} />} />
            <Route path="/charities" element={<CharitiesManagement />} />
            <Route path="/charities/add" element={<AddCharity />} />
            <Route path="/charities/edit/:id" element={<EditCharity />} />
            <Route path="/donations" element={<DonationsManagement />} />
          </Routes>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .background-animate {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

const NavLink = ({ to, icon, label }) => (
  <Link 
    to={to}
    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all group"
  >
    <span className="text-lg group-hover:text-pink-300">{
      icon === 'dashboard' ? '📊' :
      icon === 'handshake' ? '🤝' :
      icon === 'donation' ? '💰' : '🔹'
    }</span>
    <span className="font-medium group-hover:text-white">{label}</span>
  </Link>
);

export default AdminDashboard;
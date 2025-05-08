// import { useState, useEffect } from 'react';
// import { useNavigate, Routes, Route, Link } from 'react-router-dom';
// import axios from 'axios';

// const AdminDashboard = () => {
//   // Authentication state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [admin, setAdmin] = useState(null);
//   const navigate = useNavigate();

  
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     setIsAuthenticated(false);
//     navigate('/AdminLogin');
//   };

 

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 background-animate">
//       {/* Animated background elements */}
//       <div className="fixed inset-0 overflow-hidden">
//         {[...Array(20)].map((_, i) => (
//           <div 
//             key={i}
//             className="absolute rounded-full bg-white bg-opacity-10"
//             style={{
//               width: `${Math.random() * 100 + 50}px`,
//               height: `${Math.random() * 100 + 50}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out`,
//               animationDelay: `${Math.random() * 5}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative flex h-screen">
//         {/* Sidebar */}
//         <div className="w-64 bg-black bg-opacity-70 text-white p-6 backdrop-blur-lg border-r border-white border-opacity-10">
//           <div className="flex items-center space-x-3 mb-10">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
//               <span className="text-xl font-bold">A</span>
//             </div>
//             <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-300">
//               Charity Hub
//             </h1>
//           </div>
          
//           <nav className="space-y-2">
//             <NavLink to="/admin" icon="dashboard" label="Dashboard" />
//             <NavLink to="/admin/charities" icon="handshake" label="Charities" />
//             <NavLink to="/admin/donations" icon="donation" label="Donations" />
//           </nav>
          
//           <button 
//             onClick={handleLogout}
//             className="mt-10 w-full py-2 px-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
//           >
//             <span>Logout</span>
//             <span className="text-sm">→</span>
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 overflow-y-auto p-8">
//           <Routes>
//             <Route path="/" element={<DashboardHome admin={admin} />} />
//             <Route path="/charities" element={<CharitiesManagement />} />
//             <Route path="/charities/add" element={<AddCharity />} />
//             <Route path="/charities/edit/:id" element={<EditCharity />} />
//             <Route path="/donations" element={<DonationsManagement />} />
//           </Routes>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(5deg); }
//         }
//         .background-animate {
//           background-size: 400% 400%;
//           animation: gradient 15s ease infinite;
//         }
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//       `}</style>
//     </div>
//   );
// };

// // Helper Components
// const NavLink = ({ to, icon, label }) => (
//   <Link 
//     to={to}
//     className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all group"
//   >
//     <span className="text-lg group-hover:text-pink-300">{
//       icon === 'dashboard' ? '📊' :
//       icon === 'handshake' ? '🤝' :
//       icon === 'donation' ? '💰' : '🔹'
//     }</span>
//     <span className="font-medium group-hover:text-white">{label}</span>
//   </Link>
// );



// const DashboardHome = ({ admin }) => (
//   <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-10">
//     <h2 className="text-2xl font-bold text-white mb-6">Welcome back, {admin?.name}</h2>
    
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//       <StatCard 
//         title="Total Donations" 
//         value="$24,589" 
//         change="+12% from last month" 
//         icon="💰" 
//         color="from-green-500 to-emerald-500"
//       />
//       <StatCard 
//         title="Active Charities" 
//         value="42" 
//         change="+3 new this week" 
//         icon="🤝" 
//         color="from-blue-500 to-cyan-500"
//       />
//       <StatCard 
//         title="Pending Requests" 
//         value="7" 
//         change="2 need immediate attention" 
//         icon="⏳" 
//         color="from-amber-500 to-yellow-500"
//       />
//     </div>
    
//     <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-10">
//       <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
//       <div className="space-y-4">
//         {[
//           { action: "New donation", details: "$500 from John D.", time: "2 mins ago" },
//           { action: "Charity approved", details: "Food for All", time: "1 hour ago" },
//           { action: "Status updated", details: "Donation #4582 completed", time: "3 hours ago" }
//         ].map((item, i) => (
//           <div key={i} className="flex items-start pb-4 border-b border-white border-opacity-5 last:border-0">
//             <div className="w-8 h-8 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center mr-3 mt-1">
//               <span className="text-sm">🔔</span>
//             </div>
//             <div>
//               <p className="text-white font-medium">{item.action}</p>
//               <p className="text-purple-200 text-sm">{item.details}</p>
//               <p className="text-purple-300 text-xs mt-1">{item.time}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const StatCard = ({ title, value, change, icon, color }) => (
//   <div className={`bg-gradient-to-br ${color} p-5 rounded-xl shadow-lg`}>
//     <div className="flex justify-between items-start">
//       <div>
//         <p className="text-white text-opacity-80 text-sm">{title}</p>
//         <p className="text-2xl font-bold text-white mt-1">{value}</p>
//       </div>
//       <div className="text-3xl">{icon}</div>
//     </div>
//     <p className="text-white text-opacity-70 text-xs mt-3">{change}</p>
//   </div>
// );

// const CharitiesManagement = () => {
//   const [charities, setCharities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setCharities([
//         {
//           id: 1,
//           name: "Food for All",
//           description: "Providing meals to underserved communities",
//           email: "contact@foodforall.org",
//           phone: "+2348012345678",
//           status: "active"
//         },
//         {
//           id: 2,
//           name: "Clean Water Initiative",
//           description: "Bringing clean water to rural areas",
//           email: "info@cleanwater.org",
//           phone: "+2348098765432",
//           status: "active"
//         }
//       ]);
//       setLoading(false);
//     }, 800);
//   }, []);

//   const filteredCharities = charities.filter(charity =>
//     charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     charity.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-10">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Manage Charities</h2>
//         <div className="flex space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search charities..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//             <span className="absolute left-3 top-2.5 text-purple-300">🔍</span>
//           </div>
//           <Link 
//             to="/admin/charities/add"
//             className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all"
//           >
//             Add Charity
//           </Link>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//         </div>
//       ) : (
//         <div className="overflow-hidden border border-white border-opacity-10 rounded-lg">
//           <table className="min-w-full divide-y divide-white divide-opacity-10">
//             <thead className="bg-black bg-opacity-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Description</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Contact</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-black bg-opacity-30 divide-y divide-white divide-opacity-10">
//               {filteredCharities.map((charity) => (
//                 <tr key={charity.id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-white">{charity.name}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-purple-200 line-clamp-2">{charity.description}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-purple-200">{charity.email}</div>
//                     <div className="text-xs text-purple-300">{charity.phone}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       charity.status === 'active' 
//                         ? 'bg-green-500 bg-opacity-20 text-green-300' 
//                         : 'bg-red-500 bg-opacity-20 text-red-300'
//                     }`}>
//                       {charity.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <Link 
//                       to={`/admin/charities/edit/${charity.id}`}
//                       className="text-purple-400 hover:text-purple-300 mr-3"
//                     >
//                       Edit
//                     </Link>
//                     <button className="text-pink-400 hover:text-pink-300">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// const AddCharity = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     address: {
//       street: '',
//       city: '',
//       state: '',
//       country: 'Nigeria',
//       postalCode: ''
//     },
//     contact: {
//       email: '',
//       phone: '',
//       website: ''
//     },
//     isActive: true
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name.startsWith('address.')) {
//       const field = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         address: { ...prev.address, [field]: value }
//       }));
//     } else if (name.startsWith('contact.')) {
//       const field = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         contact: { ...prev.contact, [field]: value }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate API call
//     setTimeout(() => {
//       navigate('/admin/charities');
//     }, 800);
//   };

//   return (
//     <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-10">
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-2xl font-bold text-white">Add New Charity</h2>
//         <button 
//           onClick={() => navigate('/admin/charities')}
//           className="text-purple-300 hover:text-white"
//         >
//           ← Back to charities
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Basic Information */}
//         <div className="bg-black bg-opacity-30 p-6 rounded-xl border border-white border-opacity-10">
//           <h3 className="text-lg font-medium text-white mb-4">Basic Information</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-purple-200 mb-1">Charity Name*</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-purple-200 mb-1">Description*</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 rows="4"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Address Information */}
//         <div className="bg-black bg-opacity-30 p-6 rounded-xl border border-white border-opacity-10">
//           <h3 className="text-lg font-medium text-white mb-4">Address Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-purple-200 mb-1">Street Address</label>
//               <input
//                 type="text"
//                 name="address.street"
//                 value={formData.address.street}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-purple-200 mb-1">City</label>
//               <input
//                 type="text"
//                 name="address.city"
//                 value={formData.address.city}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-purple-200 mb-1">State</label>
//               <input
//                 type="text"
//                 name="address.state"
//                 value={formData.address.state}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-purple-200 mb-1">Country</label>
//               <select
//                 name="address.country"
//                 value={formData.address.country}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               >
//                 <option value="Nigeria">Nigeria</option>
//                 <option value="Ghana">Ghana</option>
//                 <option value="Kenya">Kenya</option>
//                 <option value="South Africa">South Africa</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-purple-200 mb-1">Postal Code</label>
//               <input
//                 type="text"
//                 name="address.postalCode"
//                 value={formData.address.postalCode}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Contact Information */}
//         <div className="bg-black bg-opacity-30 p-6 rounded-xl border border-white border-opacity-10">
//           <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-purple-200 mb-1">Email*</label>
//               <input
//                 type="email"
//                 name="contact.email"
//                 value={formData.contact.email}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-purple-200 mb-1">Phone Number*</label>
//               <input
//                 type="tel"
//                 name="contact.phone"
//                 value={formData.contact.phone}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 required
//               />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-purple-200 mb-1">Website</label>
//               <input
//                 type="url"
//                 name="contact.website"
//                 value={formData.contact.website}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="https://example.com"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Status */}
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//             className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//           />
//           <label className="ml-2 block text-sm text-purple-200">Active Charity</label>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end space-x-4 pt-6">
//           <button
//             type="button"
//             onClick={() => navigate('/admin/charities')}
//             className="px-6 py-2 border border-white border-opacity-20 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all"
//           >
//             Save Charity
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const EditCharity = () => {
//   // Similar to AddCharity but with pre-filled data
//   return <AddCharity />;
// };

// const DonationsManagement = () => {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [statusFilter, setStatusFilter] = useState('all');

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setDonations([
//         {
//           id: 1,
//           donorName: "John Doe",
//           donorEmail: "john@example.com",
//           charity: { name: "Food for All" },
//           amount: 5000,
//           date: "2023-05-15",
//           status: "completed"
//         },
//         {
//           id: 2,
//           donorName: "Jane Smith",
//           donorEmail: "jane@example.com",
//           charity: { name: "Clean Water Initiative" },
//           amount: 2500,
//           date: "2023-05-14",
//           status: "pending"
//         }
//       ]);
//       setLoading(false);
//     }, 800);
//   }, []);

//   const filteredDonations = statusFilter === 'all' 
//     ? donations 
//     : donations.filter(d => d.status === statusFilter);

//   const handleStatusChange = (id, newStatus) => {
//     setDonations(donations.map(donation => 
//       donation.id === id ? { ...donation, status: newStatus } : donation
//     ));
//   };

//   return (
//     <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-10">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Manage Donations</h2>
//         <div className="flex items-center space-x-4">
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="pl-3 pr-8 py-2 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           >
//             <option value="all">All Statuses</option>
//             <option value="pending">Pending</option>
//             <option value="completed">Completed</option>
//             <option value="failed">Failed</option>
//           </select>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//         </div>
//       ) : (
//         <div className="overflow-hidden border border-white border-opacity-10 rounded-lg">
//           <table className="min-w-full divide-y divide-white divide-opacity-10">
//             <thead className="bg-black bg-opacity-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Donor</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Charity</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-black bg-opacity-30 divide-y divide-white divide-opacity-10">
//               {filteredDonations.map((donation) => (
//                 <tr key={donation.id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-white">{donation.donorName}</div>
//                     <div className="text-xs text-purple-300">{donation.donorEmail}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-purple-200">{donation.charity?.name || 'General'}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-white">₦{donation.amount.toLocaleString()}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-purple-200">{new Date(donation.date).toLocaleDateString()}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <select
//                       value={donation.status}
//                       onChange={(e) => handleStatusChange(donation.id, e.target.value)}
//                       className={`px-2 py-1 text-xs rounded-full bg-opacity-20 ${
//                         donation.status === 'completed' ? 'bg-green-500 text-green-300' :
//                         donation.status === 'pending' ? 'bg-amber-500 text-amber-300' :
//                         'bg-red-500 text-red-300'
//                       }`}
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="completed">Completed</option>
//                       <option value="failed">Failed</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;





import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

// Import components
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
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 background-animate">
      {/* Animated background elements */}
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
        {/* Sidebar */}
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

        {/* Main Content */}
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

// Helper Component
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
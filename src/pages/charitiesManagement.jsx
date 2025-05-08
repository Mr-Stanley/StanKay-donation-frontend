import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CharitiesManagement = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:8000/api/charities', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCharities(response.data);
      } catch (err) {
        console.error('Failed to fetch charities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharities();
  }, []);

  const filteredCharities = charities.filter(charity =>
    charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Manage Charities</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search charities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-2.5 text-purple-300">🔍</span>
          </div>
          <Link 
            to="/admin/charities/add"
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all"
          >
            Add Charity
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="overflow-hidden border border-white border-opacity-10 rounded-lg">
          <table className="min-w-full divide-y divide-white divide-opacity-10">
            <thead className="bg-black bg-opacity-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-black bg-opacity-30 divide-y divide-white divide-opacity-10">
              {filteredCharities.map((charity) => (
                <tr key={charity.id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{charity.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-purple-200 line-clamp-2">{charity.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-purple-200">{charity.email}</div>
                    <div className="text-xs text-purple-300">{charity.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      charity.status === 'active' 
                        ? 'bg-green-500 bg-opacity-20 text-green-300' 
                        : 'bg-red-500 bg-opacity-20 text-red-300'
                    }`}>
                      {charity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      to={`/admin/charities/edit/${charity.id}`}
                      className="text-purple-400 hover:text-purple-300 mr-3"
                    >
                      Edit
                    </Link>
                    <button className="text-pink-400 hover:text-pink-300">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CharitiesManagement;
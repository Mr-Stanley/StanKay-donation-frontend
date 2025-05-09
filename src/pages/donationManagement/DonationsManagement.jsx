import { useState, useEffect } from 'react';
import axios from 'axios';

const DonationsManagement = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:8000/api/donations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonations(response.data);
      } catch (err) {
        console.error('Failed to fetch donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(
        `http://localhost:8000/api/donations/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDonations(donations.map(donation => 
        donation.id === id ? { ...donation, status: newStatus } : donation
      ));
    } catch (err) {
      console.error('Failed to update donation status:', err);
    }
  };

  const filteredDonations = statusFilter === 'all' 
    ? donations 
    : donations.filter(d => d.status === statusFilter);

  return (
    <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Manage Donations</h2>
        <div className="flex items-center space-x-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-3 pr-8 py-2 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Charity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-black bg-opacity-30 divide-y divide-white divide-opacity-10">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{donation.donorName}</div>
                    <div className="text-xs text-purple-300">{donation.donorEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-purple-200">{donation.charity?.name || 'General'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">₦{donation.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-purple-200">{new Date(donation.date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={donation.status}
                      onChange={(e) => handleStatusChange(donation.id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded-full bg-opacity-20 ${
                        donation.status === 'completed' ? 'bg-green-500 text-green-300' :
                        donation.status === 'pending' ? 'bg-amber-500 text-amber-300' :
                        'bg-red-500 text-red-300'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
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

export default DonationsManagement;
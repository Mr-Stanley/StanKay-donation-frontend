import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCharity = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: 'Nigeria',
      postalCode: ''
    },
    contact: {
      email: '',
      phone: '',
      website: ''
    },
    isActive: true
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else if (name.startsWith('contact.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: { ...prev.contact, [field]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:8000/api/charities', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/admin/charities');
    } catch (err) {
      console.error('Failed to add charity:', err);
    }
  };

  return (
    <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Add New Charity</h2>
        <button 
          onClick={() => navigate('/admin/charities')}
          className="text-purple-300 hover:text-white"
        >
          ← Back to charities
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-black bg-opacity-30 p-6 rounded-xl border border-white border-opacity-10">
          <h3 className="text-lg font-medium text-white mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">Charity Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows="4"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-black bg-opacity-30 p-6 rounded-xl border border-white border-opacity-10">
          <h3 className="text-lg font-medium text-white mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">Street Address</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">City</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">State</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">Country</label>
              <select
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">Postal Code</label>
              <input
                type="text"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
                className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-black bg-opacity-30 p-6 rounded-xl border border-white border-opacity-10">
          <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">Email*</label>
              <input
                type="email"
                name="contact.email"
                value={formData.contact.email}
                onChange={handleChange}
                className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">Phone Number*</label>
              <input
                type="tel"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleChange}
                className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-purple-200 mb-1">Website</label>
              <input
                type="url"
                name="contact.website"
                value={formData.contact.website}
                onChange={handleChange}
                className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-purple-200">Active Charity</label>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/charities')}
            className="px-6 py-2 border border-white border-opacity-20 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all"
          >
            Save Charity
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCharity;
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditCharity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchCharity = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`http://localhost:8000/api/charities/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData(response.data);
      } catch (err) {
        console.error('Failed to fetch charity:', err);
        navigate('/admin/charities');
      }
    };

    fetchCharity();
  }, [id, navigate]);

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
      await axios.put(`http://localhost:8000/api/charities/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/admin/charities');
    } catch (err) {
      console.error('Failed to update charity:', err);
    }
  };

  return (
    <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Edit Charity</h2>
        <button 
          onClick={() => navigate('/admin/charities')}
          className="text-purple-300 hover:text-white"
        >
          ← Back to charities
        </button>
      </div>

    
    </div>
  );
};

export default EditCharity;
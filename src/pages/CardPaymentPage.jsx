import React, { useState } from 'react';
import 'animate.css';
import axios from 'axios'; // For making API requests

const CardPaymentPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    donationAmount: '',
    customAmount: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    securityCode: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle radio button selection
  const handleAmountSelect = (amount) => {
    setFormData((prev) => ({
      ...prev,
      donationAmount: amount.replace('#', ''), // Remove '#' for numeric value
      customAmount: '', // Clear custom amount when predefined amount is selected
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form
    const amount = formData.donationAmount || formData.customAmount;
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please select or enter a valid donation amount');
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in all required donor information');
      return;
    }
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.securityCode) {
      setError('Please fill in all payment details');
      return;
    }

    // Prepare data for backend
    const payload = {
      email: formData.email,
      selectedAmount: Number(formData.donationAmount || formData.customAmount),
      firstName: formData.firstName,
      lastName: formData.lastName,
      country: formData.country,
      // Note: Card details should be handled by a payment gateway (e.g., Stripe) client-side
    };

    try {
      // Send request to backend (adjust URL based on your API)
      const response = await axios.post('http://localhost:3000/api/users/pay', payload);
      setSuccess(response.data.message);
      // Reset form
      setFormData({
        donationAmount: '',
        customAmount: '',
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        securityCode: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 py-12 w-full">
      {/* Header with Logo */}
      <div className="flex justify-between items-center px-4 mb-8">
        <div className="flex items-center animate__animated animate__fadeInLeft">
          <img src="/gracious-logo.png" alt="Gracious Logo" className="h-10 mr-2" />
          <h3 className="text-xl font-bold text-gray-800">StanKay Donation Hub</h3>
        </div>
        <button className="bg-amber-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-amber-600 transition duration-300 animate__animated animate__fadeInRight">
          Donate
        </button>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto px-4">
        {/* Donation Amount Section */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 animate__animated animate__fadeInDown">
          Select Your Donation Amount
        </h3>
        <div className="flex flex-wrap gap-4 mb-4">
          {['#500', '#1000', '#2000', '#5000', '#10000', '#50000'].map((amount, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name="donation-amount"
                value={amount}
                checked={formData.donationAmount === amount.replace('#', '')}
                onChange={() => handleAmountSelect(amount)}
                className="hidden"
              />
              <span
                className={`w-12 h-12 flex items-center justify-center border-2 rounded-full font-semibold cursor-pointer transition duration-300 ${
                  formData.donationAmount === amount.replace('#', '')
                    ? 'border-amber-500 text-amber-500'
                    : 'border-gray-300 text-gray-800 hover:border-amber-500 hover:text-amber-500'
                }`}
              >
                {amount}
              </span>
            </label>
          ))}
          <button className="bg-gradient-to-r from-amber-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-full hover:from-amber-600 hover:to-pink-600 transition duration-300">
            Pay with Transfer
          </button>
        </div>

        {/* Custom Amount Input */}
        <div className="mb-6">
          <input
            type="text"
            name="customAmount"
            placeholder="Custom Amount"
            value={formData.customAmount}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                customAmount: e.target.value,
                donationAmount: '', // Clear predefined amount when custom amount is entered
              }));
            }}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Error/Success Messages */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        {/* Note to Donors */}
        <p className="text-blue-600 text-sm mb-8 animate__animated animate__fadeInUp">
          This is simple note to the donators regarding our service and policy.
        </p>

        {/* Donor Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Country Selection */}
        <select
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md mb-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="">Select Country</option>
          <option value="usa">USA</option>
          <option value="nigeria">Nigeria</option>
          <option value="canada">Canada</option>
          <option value="uk">UK</option>
        </select>

        {/* Payment Details */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 animate__animated animate__fadeInDown">
          Payment Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <input
            type="Number"
            name="cardNumber"
            placeholder="Enter your card number"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="cardName"
            placeholder="Name on your card"
            value={formData.cardName}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            name="CVV"
            placeholder="CVV"
            value={formData.securityCode}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Donate Now Button */}
        <button
          onClick={handleSubmit}
          className="bg-amber-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-amber-600 transition duration-300 flex items-center justify-center mx-auto animate__animated animate__fadeInUp"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Pay the selected amount now
        </button>
      </div>
    </div>
  );
};

export default CardPaymentPage;
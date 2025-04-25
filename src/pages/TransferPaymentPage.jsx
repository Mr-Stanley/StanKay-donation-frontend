import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'animate.css';
import axios from 'axios';

const TransferPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialAmount = location.state?.amount || '';
  const [amount, setAmount] = useState(initialAmount);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showTransferInstructions, setShowTransferInstructions] = useState(true);

  // Generated account number (static placeholder)
  const generatedAccountNumber = '1234567890'; // Replace with dynamic logic if needed
  const reference = `Donation-${Date.now()}`; // Simple reference

  // Handle amount change
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Handle transfer payment submission
  const handleTransferPayment = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }

    try {
      const payload = {
        selectedAmount: Number(amount),
        paymentMethod: 'transfer',
        accountNumber: generatedAccountNumber,
        reference,
      };
      const response = await axios.post('http://localhost:3000/api/users/pay-transfer', payload);
      setSuccess(response.data.message);
      setAmount('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process transfer request. Please try again.');
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate('/payment', { state: { amount } });
  };

  return (
    <div className="bg-gray-100 py-12 w-full">
      {/* Header with Logo */}
      <div className="flex justify-between items-center px-4 mb-8">
        <div className="flex items-center animate__animated animate__fadeInLeft">
          <img src="/gracious-logo.png" alt="Gracious Logo" className="h-10 mr-2" />
          <h3 className="text-xl font-bold text-gray-800">StanKay Donation Hub</h3>
        </div>
        <button
          onClick={handleBack}
          className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300 animate__animated animate__fadeInRight"
        >
          Back to Payment
        </button>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto px-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 animate__animated animate__fadeInDown">
          Bank Transfer Payment
        </h3>

        {/* Donation Amount */}
        <div className="mb-6">
          <p className="text-gray-800 font-semibold">Donation Amount</p>
          <input
            type="text"
            placeholder="Enter or adjust amount"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mt-2"
          />
        </div>

        {/* Error/Success Messages */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        {/* Bank Transfer Instructions */}
        {showTransferInstructions && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-md animate__animated animate__fadeIn">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">Bank Transfer Instructions</h4>
            <p className="text-blue-600">
              Please transfer <strong>₦{amount || '0'}</strong> to the following account:
            </p>
            <ul className="text-blue-600 mt-2">
              <li><strong>Bank Name:</strong> Example Bank</li>
              <li><strong>Account Name:</strong> StanKay Donation Hub</li>
              <li><strong>Account Number:</strong> {generatedAccountNumber}</li>
              <li><strong>Reference:</strong> {reference}</li>
            </ul>
            <p className="text-blue-600 mt-2">
              After sending the money, click the button below to confirm.
            </p>
          </div>
        )}

        {/* Confirm Transfer Button */}
        <button
          onClick={handleTransferPayment}
          className="bg-amber-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-amber-600 transition duration-300 flex items-center justify-center mx-auto animate__animated animate__fadeInUp"
        >
          I've sent the money
        </button>
      </div>
    </div>
  );
};

export default TransferPaymentPage;
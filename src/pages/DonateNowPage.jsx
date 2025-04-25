import { useState } from 'react';
import axios from 'axios';

function DonateNowPage() {
  const [donationType, setDonationType] = useState('');
  const [foodItems, setFoodItems] = useState('');
  const [quantity, setQuantity] = useState('');
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
  const [showTransferInstructions, setShowTransferInstructions] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Generated account number and reference for transfer (static for demo)
  const generatedAccountNumber = '1234567890';
  const reference = `Donation-${Date.now()}`;

  const handleDonationTypeChange = (e) => {
    setDonationType(e.target.value);
    setError(null);
    setSuccess(null);
    setShowTransferInstructions(false);
    setFoodItems('');
    setQuantity('');
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
    setTransferAmount('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountSelect = (amount) => {
    setFormData((prev) => ({
      ...prev,
      donationAmount: amount.replace('#', ''),
      customAmount: '',
    }));
    setTransferAmount(amount.replace('#', '')); // Set transfer amount for consistency
  };

  const handleFoodDonationSubmit = async (e) => {
    e.preventDefault();
    if (!foodItems.trim() || !quantity.trim()) {
      setError('Please fill in all food donation fields');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const donationData = { type: 'food', foodItems, quantity: parseInt(quantity) };
      const response = await axios.post('http://localhost:5000/api/donations', donationData);
      setSuccess(response.data.message || 'Food donation submitted successfully!');
      setFoodItems('');
      setQuantity('');
      setDonationType('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit food donation');
    } finally {
      setLoading(false);
    }
  };

  const handleCashDonationSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const amount = formData.donationAmount || formData.customAmount;
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please select or enter a valid donation amount');
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in all required donor information');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.securityCode) {
      setError('Please fill in all payment details');
      return;
    }
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      setError('Card number must be 16 digits');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      setError('Expiry date must be in MM/YY format');
      return;
    }
    if (!/^\d{3}$/.test(formData.securityCode)) {
      setError('CVV must be 3 digits');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const donationData = {
        type: 'cash',
        paymentMethod: 'card',
        selectedAmount: Number(amount),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        // Card details excluded from payload; use Stripe in production
      };
      const response = await axios.post('http://localhost:5000/api/donations', donationData);
      setSuccess(response.data.message || 'Cash donation submitted successfully!');
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
      setDonationType('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit cash donation');
    } finally {
      setLoading(false);
    }
  };

  const handleTransferPayment = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const amount = formData.donationAmount || formData.customAmount || transferAmount;
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const donationData = {
        type: 'cash',
        paymentMethod: 'transfer',
        selectedAmount: Number(amount),
        accountNumber: generatedAccountNumber,
        reference,
      };
      const response = await axios.post('http://localhost:5000/api/donations', donationData);
      setSuccess(response.data.message || 'Transfer donation confirmed successfully!');
      setFormData((prev) => ({
        ...prev,
        donationAmount: '',
        customAmount: '',
      }));
      setTransferAmount('');
      setShowTransferInstructions(false);
      setDonationType('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process transfer request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="flex justify-between items-center w-full max-w-2xl mb-8">
        <div className="flex items-center animate-bounce">
          <img src="/gracious-logo.png" alt="Gracious Logo" className="h-10 mr-2" />
          <h3 className="text-xl font-bold text-gray-800">StanKay Donation Hub</h3>
        </div>
        <button className="bg-amber-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-amber-600 transition duration-300 animate-pulse">
          Donate
        </button>
      </div>

      <div className="w-full max-w-md mb-6">
        <label htmlFor="donationType" className="block text-gray-700 font-medium mb-2 animate-fade-in-down">
          Select Donation Type
        </label>
        <select
          id="donationType"
          value={donationType}
          onChange={handleDonationTypeChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 animate-fade-in"
        >
          <option value="" disabled>
            Choose an option
          </option>
          <option value="cash">Cash Donation</option>
          <option value="food">Food Donation</option>
        </select>
      </div>

      {success && (
        <div className="w-full max-w-md mb-6 p-4 bg-green-100 text-green-700 rounded-md animate-fade-in">
          {success}
        </div>
      )}

      {error && (
        <div className="w-full max-w-md mb-6 p-4 bg-red-100 text-red-700 rounded-md animate-fade-in">
          {error}
        </div>
      )}

      {donationType === 'food' && (
        <form
          onSubmit={handleFoodDonationSubmit}
          className="w-full max-w-md bg-white p-6 rounded-md shadow-md mb-6 animate-fade-in-up"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Food Donation Details</h2>
          <div className="mb-4">
            <label htmlFor="foodItems" className="block text-gray-700 font-medium mb-2">
              Food Items
            </label>
            <input
              id="foodItems"
              type="text"
              value={foodItems}
              onChange={(e) => setFoodItems(e.target.value)}
              placeholder="e.g., Rice, Canned Goods"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 10"
              min="1"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Food Donation'}
          </button>
        </form>
      )}

      {donationType === 'cash' && (
        <div className="w-full max-w-2xl">
          {!showTransferInstructions ? (
            <form
              onSubmit={handleCashDonationSubmit}
              className="bg-white p-6 rounded-md shadow-md mb-6 animate-fade-in-up"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Your Donation Amount</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                {['500', '1000', '2000', '5000', '10000', '50000'].map((amount, index) => (
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
                <button
                  type="button"
                  onClick={() => setShowTransferInstructions(true)}
                  className="bg-gradient-to-r from-amber-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-full hover:from-amber-600 hover:to-pink-600 transition duration-300"
                >
                  Pay with Transfer
                </button>
              </div>

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
                      donationAmount: '',
                    }));
                    setTransferAmount(e.target.value);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <p className="text-blue-600 text-sm mb-8">
                This is a simple note to the donators regarding our service and policy.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Donor Information</h2>
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

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <input
                  type="text"
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
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="text"
                  name="securityCode"
                  placeholder="CVV"
                  value={formData.securityCode}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`bg-amber-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-amber-600 transition duration-300 flex items-center justify-center mx-auto ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {loading ? 'Submitting...' : 'Pay the selected amount now'}
              </button>
            </form>
          ) : (
            <div className="bg-white p-6 rounded-md shadow-md mb-6 animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bank Transfer Payment</h2>
              <div className="mb-6">
                <p className="text-gray-800 font-semibold">Donation Amount</p>
                <input
                  type="text"
                  placeholder="Enter or adjust amount"
                  value={transferAmount}
                  onChange={(e) => {
                    setTransferAmount(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      donationAmount: '',
                      customAmount: e.target.value,
                    }));
                  }}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mt-2"
                />
              </div>

              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Bank Transfer Instructions</h4>
                <p className="text-blue-600">
                  Please transfer <strong>₦{transferAmount || '0'}</strong> to the following account:
                </p>
                <ul className="text-blue-600 mt-2">
                  <li><strong>Bank Name:</strong> OPAY</li>
                  <li><strong>Account Name:</strong> STANLEY UGOCHUKWU</li>
                  <li><strong>Account Number:</strong> 8142796616</li>
                  <li><strong>Reference:</strong> {reference}</li>
                </ul>
                <p className="text-blue-600 mt-2">
                  After sending the money, click the button below to confirm.
                </p>
              </div>

              <button
                onClick={handleTransferPayment}
                disabled={loading}
                className={`bg-amber-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-amber-600 transition duration-300 flex items-center justify-center mx-auto ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : "I've sent the money"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DonateNowPage;
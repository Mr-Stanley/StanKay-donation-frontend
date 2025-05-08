
import { useState } from 'react';
import axios from 'axios';
import { PaystackButton } from 'react-paystack';

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
  });
  const [showTransferInstructions, setShowTransferInstructions] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState('card'); // 'card' or 'transfer'

  // Paystack configuration
  const publicKey = 'pk_test_your_public_key'; // Replace with your Paystack Test Public Key
  const [accessCode, setAccessCode] = useState('');

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
    });
    setTransferAmount('');
    setActiveTab('card');
    setAccessCode('');
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
      donationAmount: amount.replace('₦', ''),
      customAmount: '',
    }));
    setTransferAmount(amount.replace('₦', ''));
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
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess('Thank you for your food donation! Your contribution will help feed those in need.');
      setFoodItems('');
      setQuantity('');
      setDonationType('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit food donation');
    } finally {
      setLoading(false);
    }
  };

  const initializePayment = async (data) => {
    const amount = formData.donationAmount || formData.customAmount;
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please select or enter a valid donation amount');
      return null;
    }
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in all required donor information');
      return null;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/paystack/initialize', {
        email: formData.email,
        amount: Number(amount) * 100, // Convert to kobo
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }

    });
    setPaymentData(response.data.token);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to initialize payment');
      setLoading(false);
      return null;
    }
  };

  const handlePaystackSuccess = async (reference) => {
    setLoading(true);
    setError(null);
    try {
      // Verify payment on backend
      const response = await axios.get(`http://localhost:8000/api/paystack/verify/${reference.reference}`);
      const amount = formData.donationAmount || formData.customAmount;
      setSuccess(`Thank you for your donation of ₦${amount}! A receipt has been sent to ${formData.email}.`);
      setFormData({
        donationAmount: '',
        customAmount: '',
        firstName: '',
        lastName: '',
        email: '',
        country: '',
      });
      setDonationType('');
      setAccessCode('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify payment');
    } finally {
      setLoading(false);
    }
  };

  const handlePaystackClose = () => {
    setError('Payment was closed. Please try again.');
    setAccessCode('');
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
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(`Thank you for your transfer donation of ₦${amount}! We'll notify you once we receive it.`);
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

  // Paystack button props
  const paystackProps = {
    email: formData.email,
    amount: Number(formData.donationAmount || formData.customAmount) * 100, // Convert to kobo
    publicKey,
    text: loading ? 'Processing...' : 'Donate Now',
    onSuccess: handlePaystackSuccess,
    onClose: handlePaystackClose,
    reference: `Donation-${Date.now()}`,
    accessCode,
  };

  // Impact visualization data
  const impactData = [
    { amount: 500, description: 'Feeds 1 person for a day' },
    { amount: 2000, description: 'Provides a week of meals' },
    { amount: 5000, description: 'Supports a family for a week' },
    { amount: 10000, description: 'Funds educational materials' },
    { amount: 50000, description: "Sponsors a child's education" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col items-center p-4">
      {/* Hero Section */}
      <div className="w-full max-w-6xl mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-4 animate-fade-in-down">
          Make a Difference Today
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto animate-fade-in-down delay-100">
          Your donation helps provide food, education, and hope to those in need. Every contribution makes an impact.
        </p>
        <div className="flex justify-center gap-4 animate-fade-in-down delay-200">
          <button
            onClick={() => setDonationType('cash')}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Donate Money
          </button>
          <button
            onClick={() => setDonationType('food')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Donate Food
          </button>
        </div>
      </div>

      {/* Impact Visualization */}
      <div className="w-full max-w-4xl mb-12 bg-white p-6 rounded-xl shadow-lg animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {impactData.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-lg text-center border border-amber-200 hover:shadow-md transition-all"
            >
              <div className="text-2xl font-bold text-amber-600 mb-2">₦{item.amount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Form Container */}
      {(donationType === 'food' || donationType === 'cash') && (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden mb-12 animate-fade-in-up">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
            <h2 className="text-2xl font-bold flex items-center">
              {donationType === 'food' ? (
                <>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Food Donation
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Monetary Donation
                </>
              )}
            </h2>
            <p className="opacity-90">
              {donationType === 'food' ? 'Help fight hunger by donating food items' : 'Support our mission with a financial contribution'}
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {success && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-200 animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {success}
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {donationType === 'food' ? (
              <form onSubmit={handleFoodDonationSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="foodItems" className="block text-sm font-medium text-gray-700 mb-1">
                      What food items are you donating?
                    </label>
                    <input
                      id="foodItems"
                      type="text"
                      value={foodItems}
                      onChange={(e) => setFoodItems(e.target.value)}
                      placeholder="e.g., Rice, Beans, Canned Goods, Pasta"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity (in kg or units)
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g., 10 kg or 5 units"
                      min="1"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Submit Food Donation
                    </>
                  )}
                </button>
              </form>
            ) : (
              <>
                {/* Payment Method Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    onClick={() => setActiveTab('card')}
                    className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                      activeTab === 'card' ? 'border-b-2 border-amber-500 text-amber-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Credit/Debit Card
                  </button>
                  <button
                    onClick={() => setActiveTab('transfer')}
                    className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                      activeTab === 'transfer' ? 'border-b-2 border-amber-500 text-amber-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Bank Transfer
                  </button>
                </div>

                {activeTab === 'card' ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      initializePayment();
                    }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Select Donation Amount</h3>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {['500', '1000', '2000', '5000', '10000', 'Other'].map((amount, index) => (
                          <div key={index}>
                            {amount === 'Other' ? (
                              <input
                                type="text"
                                name="customAmount"
                                placeholder="Custom"
                                value={formData.customAmount}
                                onChange={(e) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    customAmount: e.target.value,
                                    donationAmount: '',
                                  }));
                                }}
                                className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              />
                            ) : (
                              <label className="block">
                                <input
                                  type="radio"
                                  name="donationAmount"
                                  value={amount}
                                  checked={formData.donationAmount === amount}
                                  onChange={() => handleAmountSelect(amount)}
                                  className="hidden"
                                />
                                <div
                                  className={`p-3 border rounded-lg text-center cursor-pointer transition-all ${
                                    formData.donationAmount === amount
                                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                                      : 'border-gray-300 hover:border-amber-300'
                                  }`}
                                >
                                  ₦{amount}
                                </div>
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Your Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="">Select Country</option>
                          <option value="NG">Nigeria</option>
                          <option value="US">United States</option>
                          <option value="UK">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <PaystackButton
                      {...paystackProps}
                      className={`w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center ${
                        loading || !formData.email || !formData.firstName || !formData.lastName || !(formData.donationAmount || formData.customAmount)
                          ? 'opacity-70 cursor-not-allowed'
                          : ''
                      }`}
                      disabled={loading || !formData.email || !formData.firstName || !formData.lastName || !(formData.donationAmount || formData.customAmount)}
                    />
                  </form>
                ) : (
                  <form onSubmit={handleTransferPayment} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Enter Donation Amount</h3>
                      <input
                        type="text"
                        placeholder="Enter amount in Naira"
                        value={transferAmount}
                        onChange={(e) => {
                          setTransferAmount(e.target.value);
                          setFormData((prev) => ({
                            ...prev,
                            donationAmount: '',
                            customAmount: e.target.value,
                          }));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2">Bank Transfer Instructions</h4>
                      <p className="text-blue-700 mb-3">
                        Please transfer <span className="font-bold">₦{transferAmount || '0.00'}</span> to:
                      </p>

                      <div className="space-y-2 text-sm text-blue-700">
                        <div className="flex justify-between">
                          <span className="font-medium">Bank Name:</span>
                          <span>OPAY</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Account Name:</span>
                          <span>STANLEY UGOCHUKWU</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Account Number:</span>
                          <span>8142796616</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Reference:</span>
                          <span className="font-mono">{reference}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !transferAmount}
                      className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center ${
                        loading || !transferAmount ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Confirming...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          I've Made the Transfer
                        </>
                      )}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Donor Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'Knowing my donation helps feed families in need gives me so much joy.',
              name: 'Amina B.',
              role: 'Monthly Donor',
            },
            {
              quote: 'The transparency in how funds are used made me trust this organization.',
              name: 'John D.',
              role: 'Volunteer & Donor',
            },
            {
              quote: 'Easy donation process and immediate impact reports. Highly recommend!',
              name: 'Sarah K.',
              role: 'First-time Donor',
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="text-amber-500 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div className="font-medium text-gray-800">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: 'How will my donation be used?',
              answer: 'All donations go directly to our programs providing food, education, and support to those in need. We publish annual reports detailing our fund allocation.',
            },
            {
              question: 'Is my donation tax-deductible?',
              answer: 'Yes, we are a registered nonprofit organization. You will receive a receipt for tax purposes after your donation.',
            },
            {
              question: 'Can I donate items other than food?',
              answer: 'Yes! We accept clothing, school supplies, and other essentials. Contact us for more information about in-kind donations.',
            },
            {
              question: 'How can I become a recurring donor?',
              answer:
                'During the donation process, you can select the option to make your donation monthly. You can also contact us to set up a recurring bank transfer.',
            },
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-800">{faq.question}</span>
                <svg className="w-5 h-5 text-gray-500 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="p-4 bg-white text-gray-600">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default DonateNowPage;













// import { useState } from 'react';
// import axios from 'axios';

// function DonateNowPage() {
//   const [donationType, setDonationType] = useState('');
//   const [foodItems, setFoodItems] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [formData, setFormData] = useState({
//     donationAmount: '',
//     customAmount: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     country: '',
//     cardNumber: '',
//     cardName: '',
//     expiryDate: '',
//     securityCode: '',
//   });
//   const [showTransferInstructions, setShowTransferInstructions] = useState(false);
//   const [transferAmount, setTransferAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [activeTab, setActiveTab] = useState('card'); // 'card' or 'transfer'

//   // Generated account number and reference for transfer (static for demo)
//   const generatedAccountNumber = '1234567890';
//   const reference = `Donation-${Date.now()}`;

//   const handleDonationTypeChange = (e) => {
//     setDonationType(e.target.value);
//     setError(null);
//     setSuccess(null);
//     setShowTransferInstructions(false);
//     setFoodItems('');
//     setQuantity('');
//     setFormData({
//       donationAmount: '',
//       customAmount: '',
//       firstName: '',
//       lastName: '',
//       email: '',
//       country: '',
//       cardNumber: '',
//       cardName: '',
//       expiryDate: '',
//       securityCode: '',
//     });
//     setTransferAmount('');
//     setActiveTab('card');
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAmountSelect = (amount) => {
//     setFormData((prev) => ({
//       ...prev,
//       donationAmount: amount.replace('#', ''),
//       customAmount: '',
//     }));
//     setTransferAmount(amount.replace('#', ''));
//   };

//   const handleFoodDonationSubmit = async (e) => {
//     e.preventDefault();
//     if (!foodItems.trim() || !quantity.trim()) {
//       setError('Please fill in all food donation fields');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       // Simulate API call with timeout
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       setSuccess('Thank you for your food donation! Your contribution will help feed those in need.');
//       setFoodItems('');
//       setQuantity('');
//       setDonationType('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to submit food donation');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCashDonationSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     const amount = formData.donationAmount || formData.customAmount;
//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       setError('Please select or enter a valid donation amount');
//       return;
//     }
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       setError('Please fill in all required donor information');
//       return;
//     }
//     if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       setError('Please enter a valid email address');
//       return;
//     }
//     if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.securityCode) {
//       setError('Please fill in all payment details');
//       return;
//     }
//     if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
//       setError('Card number must be 16 digits');
//       return;
//     }
//     if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
//       setError('Expiry date must be in MM/YY format');
//       return;
//     }
//     if (!/^\d{3}$/.test(formData.securityCode)) {
//       setError('CVV must be 3 digits');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       // Simulate API call with timeout
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       setSuccess(`Thank you for your donation of ₦${amount}! A receipt has been sent to ${formData.email}.`);
//       setFormData({
//         donationAmount: '',
//         customAmount: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         country: '',
//         cardNumber: '',
//         cardName: '',
//         expiryDate: '',
//         securityCode: '',
//       });
//       setDonationType('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to process donation');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTransferPayment = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     const amount = formData.donationAmount || formData.customAmount || transferAmount;
//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       setError('Please enter a valid donation amount');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       // Simulate API call with timeout
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       setSuccess(`Thank you for your transfer donation of ₦${amount}! We'll notify you once we receive it.`);
//       setFormData((prev) => ({
//         ...prev,
//         donationAmount: '',
//         customAmount: '',
//       }));
//       setTransferAmount('');
//       setShowTransferInstructions(false);
//       setDonationType('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to process transfer request');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Impact visualization data
//   const impactData = [
//     { amount: 500, description: "Feeds 1 person for a day" },
//     { amount: 2000, description: "Provides a week of meals" },
//     { amount: 5000, description: "Supports a family for a week" },
//     { amount: 10000, description: "Funds educational materials" },
//     { amount: 50000, description: "Sponsors a child's education" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col items-center p-4">
//       {/* Hero Section */}
//       <div className="w-full max-w-6xl mb-8 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-4 animate-fade-in-down">
//           Make a Difference Today
//         </h1>
//         <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto animate-fade-in-down delay-100">
//           Your donation helps provide food, education, and hope to those in need. Every contribution makes an impact.
//         </p>
//         <div className="flex justify-center gap-4 animate-fade-in-down delay-200">
//           <button 
//             onClick={() => setDonationType('cash')} 
//             className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg"
//           >
//             Donate Money
//           </button>
//           <button 
//             onClick={() => setDonationType('food')} 
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg"
//           >
//             Donate Food
//           </button>
//         </div>
//       </div>

//       {/* Impact Visualization */}
//       <div className="w-full max-w-4xl mb-12 bg-white p-6 rounded-xl shadow-lg animate-fade-in">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Impact</h2>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           {impactData.map((item, index) => (
//             <div 
//               key={index} 
//               className="bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-lg text-center border border-amber-200 hover:shadow-md transition-all"
//             >
//               <div className="text-2xl font-bold text-amber-600 mb-2">₦{item.amount.toLocaleString()}</div>
//               <div className="text-sm text-gray-600">{item.description}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Donation Form Container */}
//       {(donationType === 'food' || donationType === 'cash') && (
//         <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden mb-12 animate-fade-in-up">
//           {/* Form Header */}
//           <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
//             <h2 className="text-2xl font-bold flex items-center">
//               {donationType === 'food' ? (
//                 <>
//                   <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                   Food Donation
//                 </>
//               ) : (
//                 <>
//                   <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Monetary Donation
//                 </>
//               )}
//             </h2>
//             <p className="opacity-90">
//               {donationType === 'food' 
//                 ? "Help fight hunger by donating food items" 
//                 : "Support our mission with a financial contribution"}
//             </p>
//           </div>

//           {/* Form Content */}
//           <div className="p-6">
//             {success && (
//               <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-200 animate-fade-in">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   {success}
//                 </div>
//               </div>
//             )}

//             {error && (
//               <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 animate-fade-in">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {error}
//                 </div>
//               </div>
//             )}

//             {donationType === 'food' ? (
//               <form onSubmit={handleFoodDonationSubmit} className="space-y-6">
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="foodItems" className="block text-sm font-medium text-gray-700 mb-1">
//                       What food items are you donating?
//                     </label>
//                     <input
//                       id="foodItems"
//                       type="text"
//                       value={foodItems}
//                       onChange={(e) => setFoodItems(e.target.value)}
//                       placeholder="e.g., Rice, Beans, Canned Goods, Pasta"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
//                       Quantity (in kg or units)
//                     </label>
//                     <input
//                       id="quantity"
//                       type="number"
//                       value={quantity}
//                       onChange={(e) => setQuantity(e.target.value)}
//                       placeholder="e.g., 10 kg or 5 units"
//                       min="1"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                     />
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center ${
//                     loading ? 'opacity-70 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                       </svg>
//                       Submit Food Donation
//                     </>
//                   )}
//                 </button>
//               </form>
//             ) : (
//               <>
//                 {/* Payment Method Tabs */}
//                 <div className="flex border-b border-gray-200 mb-6">
//                   <button
//                     onClick={() => setActiveTab('card')}
//                     className={`py-2 px-4 font-medium text-sm focus:outline-none ${
//                       activeTab === 'card'
//                         ? 'border-b-2 border-amber-500 text-amber-600'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     Credit/Debit Card
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('transfer')}
//                     className={`py-2 px-4 font-medium text-sm focus:outline-none ${
//                       activeTab === 'transfer'
//                         ? 'border-b-2 border-amber-500 text-amber-600'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     Bank Transfer
//                   </button>
//                 </div>

//                 {activeTab === 'card' ? (
//                   <form onSubmit={handleCashDonationSubmit} className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-900 mb-3">Select Donation Amount</h3>
//                       <div className="grid grid-cols-3 gap-3 mb-4">
//                         {['500', '1000', '2000', '5000', '10000', 'Other'].map((amount, index) => (
//                           <div key={index}>
//                             {amount === 'Other' ? (
//                               <input
//                                 type="text"
//                                 name="customAmount"
//                                 placeholder="Custom"
//                                 value={formData.customAmount}
//                                 onChange={(e) => {
//                                   setFormData((prev) => ({
//                                     ...prev,
//                                     customAmount: e.target.value,
//                                     donationAmount: '',
//                                   }));
//                                 }}
//                                 className="w-full p-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                               />
//                             ) : (
//                               <label className="block">
//                                 <input
//                                   type="radio"
//                                   name="donationAmount"
//                                   value={amount}
//                                   checked={formData.donationAmount === amount}
//                                   onChange={() => handleAmountSelect(amount)}
//                                   className="hidden"
//                                 />
//                                 <div className={`p-3 border rounded-lg text-center cursor-pointer transition-all ${
//                                   formData.donationAmount === amount
//                                     ? 'border-amber-500 bg-amber-50 text-amber-700'
//                                     : 'border-gray-300 hover:border-amber-300'
//                                 }`}>
//                                   ₦{amount}
//                                 </div>
//                               </label>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <h3 className="text-lg font-medium text-gray-900">Your Information</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//                             First Name
//                           </label>
//                           <input
//                             type="text"
//                             id="firstName"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
//                             Last Name
//                           </label>
//                           <input
//                             type="text"
//                             id="lastName"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                           Email Address
//                         </label>
//                         <input
//                           type="email"
//                           id="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                         />
//                       </div>

//                       <div>
//                         <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
//                           Country
//                         </label>
//                         <select
//                           id="country"
//                           name="country"
//                           value={formData.country}
//                           onChange={handleInputChange}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                         >
//                           <option value="">Select Country</option>
//                           <option value="NG">Nigeria</option>
//                           <option value="US">United States</option>
//                           <option value="UK">United Kingdom</option>
//                           <option value="CA">Canada</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
//                       <div>
//                         <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
//                           Card Number
//                         </label>
//                         <input
//                           type="text"
//                           id="cardNumber"
//                           name="cardNumber"
//                           value={formData.cardNumber}
//                           onChange={handleInputChange}
//                           placeholder="1234 5678 9012 3456"
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                         />
//                       </div>

//                       <div>
//                         <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
//                           Name on Card
//                         </label>
//                         <input
//                           type="text"
//                           id="cardName"
//                           name="cardName"
//                           value={formData.cardName}
//                           onChange={handleInputChange}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                         />
//                       </div>

//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
//                             Expiry Date
//                           </label>
//                           <input
//                             type="text"
//                             id="expiryDate"
//                             name="expiryDate"
//                             value={formData.expiryDate}
//                             onChange={handleInputChange}
//                             placeholder="MM/YY"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700 mb-1">
//                             Security Code
//                           </label>
//                           <input
//                             type="text"
//                             id="securityCode"
//                             name="securityCode"
//                             value={formData.securityCode}
//                             onChange={handleInputChange}
//                             placeholder="CVV"
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className={`w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center ${
//                         loading ? 'opacity-70 cursor-not-allowed' : ''
//                       }`}
//                     >
//                       {loading ? (
//                         <>
//                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Processing Donation...
//                         </>
//                       ) : (
//                         <>
//                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                           </svg>
//                           Donate Now
//                         </>
//                       )}
//                     </button>
//                   </form>
//                 ) : (
//                   <form onSubmit={handleTransferPayment} className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-900 mb-3">Enter Donation Amount</h3>
//                       <input
//                         type="text"
//                         placeholder="Enter amount in Naira"
//                         value={transferAmount}
//                         onChange={(e) => {
//                           setTransferAmount(e.target.value);
//                           setFormData((prev) => ({
//                             ...prev,
//                             donationAmount: '',
//                             customAmount: e.target.value,
//                           }));
//                         }}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                       />
//                     </div>

//                     <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                       <h4 className="font-medium text-blue-800 mb-2">Bank Transfer Instructions</h4>
//                       <p className="text-blue-700 mb-3">Please transfer <span className="font-bold">₦{transferAmount || '0.00'}</span> to:</p>
                      
//                       <div className="space-y-2 text-sm text-blue-700">
//                         <div className="flex justify-between">
//                           <span className="font-medium">Bank Name:</span>
//                           <span>OPAY</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="font-medium">Account Name:</span>
//                           <span>STANLEY UGOCHUKWU</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="font-medium">Account Number:</span>
//                           <span>8142796616</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="font-medium">Reference:</span>
//                           <span className="font-mono">{reference}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading || !transferAmount}
//                       className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center ${
//                         loading || !transferAmount ? 'opacity-70 cursor-not-allowed' : ''
//                       }`}
//                     >
//                       {loading ? (
//                         <>
//                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Confirming...
//                         </>
//                       ) : (
//                         <>
//                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                           </svg>
//                           I've Made the Transfer
//                         </>
//                       )}
//                     </button>
//                   </form>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Testimonials Section */}
//       <div className="w-full max-w-4xl mb-12">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Donor Testimonials</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             {
//               quote: "Knowing my donation helps feed families in need gives me so much joy.",
//               name: "Amina B.",
//               role: "Monthly Donor"
//             },
//             {
//               quote: "The transparency in how funds are used made me trust this organization.",
//               name: "John D.",
//               role: "Volunteer & Donor"
//             },
//             {
//               quote: "Easy donation process and immediate impact reports. Highly recommend!",
//               name: "Sarah K.",
//               role: "First-time Donor"
//             }
//           ].map((testimonial, index) => (
//             <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
//               <div className="text-amber-500 mb-4">
//                 <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
//               <div className="font-medium text-gray-800">{testimonial.name}</div>
//               <div className="text-sm text-gray-500">{testimonial.role}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="w-full max-w-4xl mb-12">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
//         <div className="space-y-4">
//           {[
//             {
//               question: "How will my donation be used?",
//               answer: "All donations go directly to our programs providing food, education, and support to those in need. We publish annual reports detailing our fund allocation."
//             },
//             {
//               question: "Is my donation tax-deductible?",
//               answer: "Yes, we are a registered nonprofit organization. You will receive a receipt for tax purposes after your donation."
//             },
//             {
//               question: "Can I donate items other than food?",
//               answer: "Yes! We accept clothing, school supplies, and other essentials. Contact us for more information about in-kind donations."
//             },
//             {
//               question: "How can I become a recurring donor?",
//               answer: "During the donation process, you can select the option to make your donation monthly. You can also contact us to set up a recurring bank transfer."
//             }
//           ].map((faq, index) => (
//             <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
//               <button className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors">
//                 <span className="font-medium text-gray-800">{faq.question}</span>
//                 <svg className="w-5 h-5 text-gray-500 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               <div className="p-4 bg-white text-gray-600">
//                 {faq.answer}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DonateNowPage;
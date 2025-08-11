import React, { useState } from 'react';
import { Heart, TrendingUp, Users, Target, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockCauses, mockDonations } from '../data/mockData';
import { Cause } from '../types';

const DonorDashboard: React.FC = () => {
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [showDonationForm, setShowDonationForm] = useState(false);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCause && donationAmount) {
      // Mock donation success
      alert(`Thank you for donating ₹${donationAmount} to ${selectedCause.title}!`);
      setShowDonationForm(false);
      setSelectedCause(null);
      setDonationAmount('');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medical':
        return '🏥';
      case 'education':
        return '📚';
      case 'disaster':
        return '🏠';
      case 'poverty':
        return '🤝';
      default:
        return '❤️';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical':
        return 'bg-red-100 text-red-800';
      case 'education':
        return 'bg-blue-100 text-blue-800';
      case 'disaster':
        return 'bg-orange-100 text-orange-800';
      case 'poverty':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRaised = mockCauses.reduce((sum, cause) => sum + cause.raisedAmount, 0);
  const totalGoal = mockCauses.reduce((sum, cause) => sum + cause.goalAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Donate to Verified Causes</h1>
        <p className="text-gray-600">Support verified individuals and organizations in need</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Causes</p>
              <p className="text-2xl font-bold text-gray-900">{mockCauses.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Raised</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalRaised.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Recent Donations</p>
              <p className="text-2xl font-bold text-gray-900">{mockDonations.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Heart className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{((totalRaised / totalGoal) * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Causes */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockCauses.map((cause) => {
          const progressPercentage = (cause.raisedAmount / cause.goalAmount) * 100;
          
          return (
            <motion.div
              key={cause.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-sm border overflow-hidden"
            >
              <img
                src={cause.imageUrl}
                alt={cause.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(cause.category)}`}>
                    {getCategoryIcon(cause.category)} {cause.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {cause.approvedAt.toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">{cause.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{cause.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">₹{cause.raisedAmount.toLocaleString()} / ₹{cause.goalAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{progressPercentage.toFixed(1)}% completed</p>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedCause(cause);
                    setShowDonationForm(true);
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Heart className="h-4 w-4" />
                  <span>Donate Now</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Donation Modal */}
      {showDonationForm && selectedCause && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Donate to {selectedCause.title}
            </h3>
            
            <div className="mb-6">
              <img
                src={selectedCause.imageUrl}
                alt={selectedCause.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <p className="text-sm text-gray-600">{selectedCause.description}</p>
            </div>

            <form onSubmit={handleDonate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount (₹)
                </label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[500, 1000, 2000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setDonationAmount(amount.toString())}
                    className="py-2 px-3 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> This is a demo. No real payment will be processed.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDonationForm(false);
                    setSelectedCause(null);
                    setDonationAmount('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Donate</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;

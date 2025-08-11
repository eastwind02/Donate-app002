import React, { useState } from 'react';
import { FileText, Upload, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const RecipientDashboard: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    identityProof: '',
    needProof: '',
    bankAccount: '',
    cause: '',
    description: '',
    requestedAmount: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-sm border p-8 text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your application has been received and is now under review by our admin team. 
            You will be notified via email once the review is complete.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Admin will verify your documents within 2-3 business days</li>
              <li>• If approved, your cause will be listed for donors to see</li>
              <li>• Funds will be distributed in the next collection cycle</li>
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for Assistance</h1>
        <p className="text-gray-600">
          Fill out this form to apply for financial assistance. All applications are reviewed and verified by our admin team.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Important Requirements</h3>
            <ul className="text-sm text-amber-700 mt-1 space-y-1">
              <li>• Valid government-issued ID proof required</li>
              <li>• Supporting documents for your need (bills, receipts, certificates)</li>
              <li>• Bank account details for fund transfer</li>
              <li>• All information will be verified before approval</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cause Category <span className="text-red-500">*</span>
            </label>
            <select
              name="cause"
              value={formData.cause}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              <option value="medical">Medical Emergency</option>
              <option value="education">Education Support</option>
              <option value="disaster">Disaster Relief</option>
              <option value="poverty">Poverty Alleviation</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Identity Proof <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="identityProof"
            value={formData.identityProof}
            onChange={handleChange}
            placeholder="e.g., Aadhaar: 1234-5678-9012, PAN: ABCDE1234F"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Provide your Aadhaar, PAN, Voter ID, or other government ID</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proof of Need <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="needProof"
            value={formData.needProof}
            onChange={handleChange}
            placeholder="e.g., Medical bills, School fee receipt, Damage assessment report"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Supporting documents that prove your financial need</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Account Details <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            placeholder="e.g., HDFC Bank - Account: 12345678901234"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Bank name and account number for fund transfer</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount Requested (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="requestedAmount"
            value={formData.requestedAmount}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Explain your situation in detail, including why you need assistance and how the funds will be used..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FileText className="h-5 w-5" />
            <span>Submit Application</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipientDashboard;

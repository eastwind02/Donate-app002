import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Heart, User, Shield, HandHeart } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'donor' | 'recipient' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && name && email) {
      login(selectedRole, name, email);
    }
  };

  const roles = [
    {
      id: 'donor' as const,
      title: 'Donor',
      description: 'Support verified causes and make a difference',
      icon: HandHeart,
      color: 'bg-green-500',
    },
    {
      id: 'recipient' as const,
      title: 'Recipient',
      description: 'Apply for assistance and get verified support',
      icon: User,
      color: 'bg-blue-500',
    },
    {
      id: 'admin' as const,
      title: 'Admin',
      description: 'Review and verify assistance applications',
      icon: Shield,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to TrustFund</h1>
          <p className="text-gray-600">Select your role to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="grid gap-3">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <motion.button
                  key={role.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${role.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{role.title}</div>
                      <div className="text-sm text-gray-600">{role.description}</div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue as {selectedRole}
              </button>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;

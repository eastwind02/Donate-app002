import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, FileText, User, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockApplications } from '../data/mockData';
import { Application } from '../types';

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (id: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id
          ? { ...app, status: 'approved', reviewedAt: new Date() }
          : app
      )
    );
    setSelectedApplication(null);
  };

  const handleReject = (id: string) => {
    if (!rejectionReason.trim()) return;
    
    setApplications(prev =>
      prev.map(app =>
        app.id === id
          ? { 
              ...app, 
              status: 'rejected', 
              reviewedAt: new Date(),
              rejectionReason: rejectionReason 
            }
          : app
      )
    );
    setSelectedApplication(null);
    setRejectionReason('');
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const reviewedApplications = applications.filter(app => app.status !== 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Review and verify assistance applications</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Applications List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Applications */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Pending Applications ({pendingApplications.length})
            </h2>
            <div className="space-y-4">
              {pendingApplications.map((application) => (
                <motion.div
                  key={application.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{application.applicantName}</h3>
                      <p className="text-sm text-gray-600">{application.cause}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span className="capitalize">{application.status}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">{application.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Amount: ₹{application.requestedAmount.toLocaleString()}</span>
                    <span>{application.submittedAt.toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
              {pendingApplications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No pending applications</p>
                </div>
              )}
            </div>
          </div>

          {/* Reviewed Applications */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Reviewed Applications ({reviewedApplications.length})
            </h2>
            <div className="space-y-4">
              {reviewedApplications.map((application) => (
                <div
                  key={application.id}
                  className="bg-white p-6 rounded-lg shadow-sm border"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{application.applicantName}</h3>
                      <p className="text-sm text-gray-600">{application.cause}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span className="capitalize">{application.status}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{application.description}</p>
                  {application.rejectionReason && (
                    <div className="bg-red-50 p-3 rounded-lg mb-3">
                      <p className="text-sm text-red-800">
                        <strong>Rejection Reason:</strong> {application.rejectionReason}
                      </p>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Amount: ₹{application.requestedAmount.toLocaleString()}</span>
                    <span>Reviewed: {application.reviewedAt?.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Details Sidebar */}
        <div className="lg:col-span-1">
          {selectedApplication ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{selectedApplication.applicantName}</p>
                    <p className="text-sm text-gray-600">{selectedApplication.cause}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-700">{selectedApplication.email}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-700">{selectedApplication.phone}</p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Documentation</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Identity:</strong> {selectedApplication.identityProof}</p>
                    <p><strong>Proof of Need:</strong> {selectedApplication.needProof}</p>
                    <p><strong>Bank Account:</strong> {selectedApplication.bankAccount}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Request Details</h4>
                  <p className="text-sm text-gray-700 mb-2">{selectedApplication.description}</p>
                  <p className="text-lg font-semibold text-blue-600">
                    ₹{selectedApplication.requestedAmount.toLocaleString()}
                  </p>
                </div>

                {selectedApplication.status === 'pending' && (
                  <div className="border-t pt-4 space-y-3">
                    <button
                      onClick={() => handleApprove(selectedApplication.id)}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve</span>
                    </button>
                    
                    <div>
                      <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Reason for rejection..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        rows={3}
                      />
                      <button
                        onClick={() => handleReject(selectedApplication.id)}
                        disabled={!rejectionReason.trim()}
                        className="w-full mt-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select an application to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

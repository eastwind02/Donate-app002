export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'donor' | 'recipient';
}

export interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  identityProof: string;
  needProof: string;
  bankAccount: string;
  cause: string;
  description: string;
  requestedAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  rejectionReason?: string;
}

export interface Cause {
  id: string;
  recipientName: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  imageUrl: string;
  status: 'active' | 'completed' | 'paused';
  approvedAt: Date;
  category: 'medical' | 'education' | 'disaster' | 'poverty' | 'other';
}

export interface Donation {
  id: string;
  donorId: string;
  causeId: string;
  amount: number;
  donatedAt: Date;
  transactionId: string;
}

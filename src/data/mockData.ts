import { faker } from '@faker-js/faker';
import { Application, Cause, Donation } from '../types';

export const mockApplications: Application[] = [
  {
    id: '1',
    applicantName: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91-9876543210',
    identityProof: 'Aadhaar: 1234-5678-9012',
    needProof: 'Medical Bills - Cancer Treatment',
    bankAccount: 'HDFC Bank - 12345678901234',
    cause: 'Medical Emergency',
    description: 'Urgent funds needed for cancer treatment. Have submitted hospital bills and doctor recommendations.',
    requestedAmount: 250000,
    status: 'pending',
    submittedAt: new Date('2024-12-15'),
  },
  {
    id: '2',
    applicantName: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91-9876543211',
    identityProof: 'PAN: ABCDE1234F',
    needProof: 'School Fee Receipt',
    bankAccount: 'SBI Bank - 98765432109876',
    cause: 'Education Support',
    description: 'Need help paying school fees for my children. Lost job due to pandemic.',
    requestedAmount: 15000,
    status: 'approved',
    submittedAt: new Date('2024-12-10'),
    reviewedAt: new Date('2024-12-12'),
  },
  {
    id: '3',
    applicantName: 'Sunita Devi',
    email: 'sunita.devi@email.com',
    phone: '+91-9876543212',
    identityProof: 'Voter ID: ABC123456',
    needProof: 'Flood Damage Assessment',
    bankAccount: 'ICICI Bank - 56789012345678',
    cause: 'Disaster Relief',
    description: 'House damaged in recent floods. Need funds for reconstruction.',
    requestedAmount: 100000,
    status: 'rejected',
    submittedAt: new Date('2024-12-08'),
    reviewedAt: new Date('2024-12-09'),
    rejectionReason: 'Insufficient documentation provided',
  }
];

export const mockCauses: Cause[] = [
  {
    id: '1',
    recipientName: 'Rajesh Kumar',
    title: 'Education Support for Children',
    description: 'Help Rajesh pay school fees for his children after losing his job during the pandemic.',
    goalAmount: 15000,
    raisedAmount: 8500,
    imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400',
    status: 'active',
    approvedAt: new Date('2024-12-12'),
    category: 'education',
  },
  {
    id: '2',
    recipientName: 'Maya Singh',
    title: 'Heart Surgery for 5-year-old',
    description: 'Critical heart surgery needed for Maya\'s daughter. Time is running out.',
    goalAmount: 300000,
    raisedAmount: 125000,
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    status: 'active',
    approvedAt: new Date('2024-12-10'),
    category: 'medical',
  },
  {
    id: '3',
    recipientName: 'Village Development Trust',
    title: 'Flood Relief - Rebuild Homes',
    description: 'Help rebuild homes destroyed in recent floods affecting 50 families.',
    goalAmount: 500000,
    raisedAmount: 450000,
    imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400',
    status: 'active',
    approvedAt: new Date('2024-12-05'),
    category: 'disaster',
  }
];

export const mockDonations: Donation[] = Array.from({ length: 20 }, (_, i) => ({
  id: `donation-${i + 1}`,
  donorId: faker.string.uuid(),
  causeId: mockCauses[Math.floor(Math.random() * mockCauses.length)].id,
  amount: Math.floor(Math.random() * 10000) + 500,
  donatedAt: faker.date.recent({ days: 30 }),
  transactionId: `TXN${faker.string.alphanumeric(10).toUpperCase()}`
}));

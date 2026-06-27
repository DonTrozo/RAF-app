export type ClaimStage =
  | 'Claim registered'
  | 'Documents pending'
  | 'Documents received'
  | 'Under assessment'
  | 'Medical review'
  | 'Legal review'
  | 'Awaiting decision'
  | 'Approved'
  | 'Payment processing'
  | 'Paid'
  | 'Rejected'
  | 'Escalated';

export type Claim = {
  id: string;
  reference: string;
  claimantName: string;
  accidentDate: string;
  assignedOffice: string;
  currentStage: ClaimStage;
  progress: number;
  riskLevel: 'Low' | 'Medium' | 'High';
};

export type DocumentStatus = 'Accepted' | 'Under review' | 'Missing' | 'Needs resubmission';

export type ClaimDocument = {
  id: string;
  name: string;
  description: string;
  status: DocumentStatus;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  priority: 'Low' | 'Medium' | 'High';
};

export type Message = {
  id: string;
  sender: string;
  preview: string;
  time: string;
};

export type Appointment = {
  id: string;
  title: string;
  date: string;
  location: string;
  status: 'Scheduled' | 'Pending' | 'Completed';
};

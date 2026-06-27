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
  claimant: string;
  stage: ClaimStage;
  progress: number;
  accidentDate: string;
  location: string;
  priority: 'Low' | 'Medium' | 'High';
  missingDocuments: string[];
  nextAction: string;
  lastUpdated: string;
};

export type TimelineEvent = {
  id: string;
  title: string;
  detail: string;
  date: string;
  visibleToClaimant: boolean;
};

export const demoClaim: Claim = {
  id: 'claim-001',
  reference: 'RAF-2026-004821',
  claimant: 'Thabo Mokoena',
  stage: 'Documents pending',
  progress: 42,
  accidentDate: '12 June 2026',
  location: 'Kempton Park, Gauteng',
  priority: 'Medium',
  missingDocuments: ['Medical report', 'Proof of income', 'Police accident report'],
  nextAction: 'Upload the missing documents so RAF can move the file to assessment.',
  lastUpdated: '27 June 2026'
};

export const claims: Claim[] = [
  demoClaim,
  {
    id: 'claim-002',
    reference: 'RAF-2026-003197',
    claimant: 'Ayesha Naidoo',
    stage: 'Medical review',
    progress: 68,
    accidentDate: '21 May 2026',
    location: 'Durban, KwaZulu-Natal',
    priority: 'High',
    missingDocuments: [],
    nextAction: 'Await RAF medical assessment outcome.',
    lastUpdated: '26 June 2026'
  },
  {
    id: 'claim-003',
    reference: 'RAF-2026-002744',
    claimant: 'Lerato Dlamini',
    stage: 'Payment processing',
    progress: 91,
    accidentDate: '2 April 2026',
    location: 'Bloemfontein, Free State',
    priority: 'Low',
    missingDocuments: [],
    nextAction: 'Payment is being prepared. Final notification will be sent once complete.',
    lastUpdated: '25 June 2026'
  }
];

export const timeline: TimelineEvent[] = [
  {
    id: 'event-001',
    title: 'Claim registered',
    detail: 'The claim was captured and assigned a reference number.',
    date: '13 June 2026',
    visibleToClaimant: true
  },
  {
    id: 'event-002',
    title: 'Identity check completed',
    detail: 'Claimant profile was checked against submitted identity information.',
    date: '14 June 2026',
    visibleToClaimant: true
  },
  {
    id: 'event-003',
    title: 'Document review started',
    detail: 'RAF official began checking uploaded supporting documents.',
    date: '18 June 2026',
    visibleToClaimant: true
  },
  {
    id: 'event-004',
    title: 'Missing documents flagged',
    detail: 'Medical report, proof of income, and police accident report are still required.',
    date: '20 June 2026',
    visibleToClaimant: true
  }
];

export const notifications = [
  'Medical report still required for RAF-2026-004821.',
  'Your appointment request was received.',
  'Payment status will update once finance processing starts.'
];

import { Appointment, Claim, ClaimDocument, Message, Notification } from './types';

export const claims: Claim[] = [
  {
    id: 'claim-001',
    reference: 'RAF-2026-014582',
    claimantName: 'Demo Claimant',
    accidentDate: '14 March 2026',
    assignedOffice: 'Johannesburg Regional Office',
    currentStage: 'Under assessment',
    progress: 42,
    riskLevel: 'Medium',
  },
  {
    id: 'claim-002',
    reference: 'RAF-2026-018219',
    claimantName: 'Beneficiary Demo',
    accidentDate: '02 April 2026',
    assignedOffice: 'Pretoria Office',
    currentStage: 'Documents pending',
    progress: 18,
    riskLevel: 'Low',
  },
];

export const documents: ClaimDocument[] = [
  {
    id: 'doc-001',
    name: 'Identity document',
    description: 'South African ID or valid passport copy.',
    status: 'Accepted',
  },
  {
    id: 'doc-002',
    name: 'Medical report',
    description: 'Hospital or medical practitioner report linked to the accident.',
    status: 'Under review',
  },
  {
    id: 'doc-003',
    name: 'Accident report',
    description: 'Police accident report or official incident confirmation.',
    status: 'Missing',
  },
  {
    id: 'doc-004',
    name: 'Bank confirmation',
    description: 'Stamped bank letter or account confirmation for payment validation.',
    status: 'Missing',
  },
  {
    id: 'doc-005',
    name: 'Proof of residence',
    description: 'Recent utility bill, lease, or municipal statement.',
    status: 'Accepted',
  },
];

export const notifications: Notification[] = [
  {
    id: 'note-001',
    title: 'Missing accident report',
    body: 'Upload the accident report to prevent delays in assessment.',
    priority: 'High',
  },
  {
    id: 'note-002',
    title: 'Medical report received',
    body: 'Your medical report has been received and is under review.',
    priority: 'Medium',
  },
  {
    id: 'note-003',
    title: 'Appointment reminder',
    body: 'You have a document verification appointment scheduled this week.',
    priority: 'Low',
  },
];

export const messages: Message[] = [
  {
    id: 'msg-001',
    sender: 'RAF Claims Office',
    preview: 'Please upload the outstanding accident report for claim RAF-2026-014582.',
    time: 'Today',
  },
  {
    id: 'msg-002',
    sender: 'Document Verification',
    preview: 'Your ID document has been accepted and linked to your claim profile.',
    time: 'Yesterday',
  },
];

export const appointments: Appointment[] = [
  {
    id: 'apt-001',
    title: 'Document verification',
    date: '30 June 2026, 10:30',
    location: 'Johannesburg Regional Office',
    status: 'Scheduled',
  },
  {
    id: 'apt-002',
    title: 'Medical assessment review',
    date: 'Pending date confirmation',
    location: 'Remote / phone confirmation',
    status: 'Pending',
  },
];

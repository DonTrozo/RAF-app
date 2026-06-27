export type Role = 'claimant' | 'raf_admin' | 'raf_official' | 'partner' | 'platform_admin';

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
  fullName: string;
};

export type AuditAction =
  | 'AUTH_REGISTER'
  | 'AUTH_LOGIN'
  | 'POPIA_CONSENT_ACCEPTED'
  | 'CLAIM_LINKED'
  | 'DOC_UPLOAD_REQUESTED'
  | 'DOC_REVIEWED'
  | 'CLAIM_STATUS_UPDATED'
  | 'ADMIN_VIEWED_CLAIM'
  | 'PARTNER_VIEWED_ASSIGNMENT';

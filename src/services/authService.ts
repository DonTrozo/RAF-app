import { appConfig } from '../config';
import { apiClient } from '../api/client';

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
};

export type AuthResult = {
  user: AuthUser;
  accessToken: string;
};

export type RegisterInput = {
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  password: string;
  popiaConsentAccepted: boolean;
};

export async function registerClaimant(input: RegisterInput): Promise<AuthResult> {
  if (appConfig.enableMocks) {
    return {
      user: { id: 'user_demo_claimant', email: input.email, fullName: input.fullName, role: 'claimant' },
      accessToken: 'mock-access-token'
    };
  }

  const response = await apiClient.post<AuthResult>('/accounts/register', input);
  return response.data;
}

export async function signInClaimant(email: string, password: string): Promise<AuthResult> {
  if (appConfig.enableMocks) {
    return {
      user: { id: 'user_demo_claimant', email, fullName: 'Demo Claimant', role: 'claimant' },
      accessToken: 'mock-access-token'
    };
  }

  const response = await apiClient.post<AuthResult>('/accounts/sign-in', { email, password });
  return response.data;
}

export async function savePopiaConsent() {
  if (appConfig.enableMocks) {
    return { accepted: true, acceptedAt: new Date().toISOString() };
  }

  const response = await apiClient.post<{ accepted: boolean; acceptedAt: string }>('/accounts/consent/popia', {});
  return response.data;
}

import { claims, documents, messages, notifications, appointments } from '../mockData';
import { appConfig } from '../config';
import { apiClient } from '../api/client';
import type { Appointment, Claim, ClaimDocument, Message, Notification } from '../types';

export type ClaimBundle = {
  claims: Claim[];
  documents: ClaimDocument[];
  messages: Message[];
  notifications: Notification[];
  appointments: Appointment[];
};

export async function getClaimantBundle(): Promise<ClaimBundle> {
  if (appConfig.enableMocks) {
    return Promise.resolve({ claims, documents, messages, notifications, appointments });
  }

  const response = await apiClient.get<ClaimBundle>('/mobile/claimant/bundle');
  return response.data;
}

export async function linkClaimReference(reference: string) {
  if (appConfig.enableMocks) {
    return Promise.resolve({ reference, linked: true, message: 'Claim linked in mock mode.' });
  }

  const response = await apiClient.post<{ reference: string; linked: boolean; message: string }>(
    '/mobile/claims/link',
    { reference }
  );

  return response.data;
}

export type AppEnvironment = 'development' | 'staging' | 'production';

export const appConfig = {
  environment: (process.env.EXPO_PUBLIC_APP_ENV || 'development') as AppEnvironment,
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.raf-connect.local',
  supportEmail: process.env.EXPO_PUBLIC_SUPPORT_EMAIL || 'support@example.com',
  supportPhone: process.env.EXPO_PUBLIC_SUPPORT_PHONE || '0800-000-000',
  enableMocks: process.env.EXPO_PUBLIC_ENABLE_MOCKS !== 'false'
};

export function isProduction() {
  return appConfig.environment === 'production';
}

export function assertProductionConfig() {
  if (!isProduction()) {
    return;
  }

  const missing: string[] = [];

  if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
    missing.push('EXPO_PUBLIC_API_BASE_URL');
  }

  if (appConfig.enableMocks) {
    missing.push('EXPO_PUBLIC_ENABLE_MOCKS=false');
  }

  if (missing.length > 0) {
    throw new Error(`Production configuration incomplete: ${missing.join(', ')}`);
  }
}

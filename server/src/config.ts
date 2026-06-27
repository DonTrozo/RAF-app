import dotenv from 'dotenv';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-secret-change-before-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  mockMode: process.env.MOCK_MODE !== 'false'
};

export function assertServerConfig() {
  if (config.nodeEnv !== 'production') {
    return;
  }

  const missing: string[] = [];

  if (!process.env.DATABASE_URL) missing.push('DATABASE_URL');
  if (!process.env.JWT_SECRET) missing.push('JWT_SECRET');
  if (config.jwtSecret.includes('dev-only')) missing.push('JWT_SECRET production value');
  if (config.mockMode) missing.push('MOCK_MODE=false');

  if (missing.length > 0) {
    throw new Error(`Missing production config: ${missing.join(', ')}`);
  }
}

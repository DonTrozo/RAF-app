import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import accountRoutes from './routes/accounts';
import mobileClaimRoutes from './routes/mobileClaims';
import adminRoutes from './routes/admin';
import partnerRoutes from './routes/partner';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json({ limit: '2mb' }));
  app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

  app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'raf-connect-api', environment: config.nodeEnv });
  });

  app.use('/accounts', accountRoutes);
  app.use('/mobile', mobileClaimRoutes);
  app.use('/admin', adminRoutes);
  app.use('/partner', partnerRoutes);

  app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found.' });
  });

  return app;
}

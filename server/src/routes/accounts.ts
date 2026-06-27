import { Router } from 'express';
import { z } from 'zod';
import { createSessionToken, requireSession } from '../middleware/session';
import { recordAuditEvent } from '../lib/auditLog';
import type { AuthUser } from '../types';

const router = Router();

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  idNumber: z.string().min(6),
  password: z.string().min(8),
  popiaConsentAccepted: z.literal(true)
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

router.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid registration details.', errors: parsed.error.flatten() });
  }

  const user: AuthUser = {
    id: 'user_demo_claimant',
    email: parsed.data.email,
    fullName: parsed.data.fullName,
    role: 'claimant'
  };

  await recordAuditEvent({ actor: user, action: 'AUTH_REGISTER', entityType: 'user', entityId: user.id });
  await recordAuditEvent({ actor: user, action: 'POPIA_CONSENT_ACCEPTED', entityType: 'user', entityId: user.id });

  return res.status(201).json({
    user,
    accessToken: createSessionToken(user)
  });
});

router.post('/sign-in', async (req, res) => {
  const parsed = signInSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid sign-in details.', errors: parsed.error.flatten() });
  }

  const user: AuthUser = {
    id: 'user_demo_claimant',
    email: parsed.data.email,
    fullName: 'Demo Claimant',
    role: 'claimant'
  };

  await recordAuditEvent({ actor: user, action: 'AUTH_LOGIN', entityType: 'user', entityId: user.id });

  return res.json({
    user,
    accessToken: createSessionToken(user)
  });
});

router.post('/consent/popia', requireSession, async (req, res) => {
  await recordAuditEvent({
    actor: req.user,
    action: 'POPIA_CONSENT_ACCEPTED',
    entityType: 'user',
    entityId: req.user?.id
  });

  return res.json({ accepted: true, acceptedAt: new Date().toISOString() });
});

export default router;

import { Router } from 'express';
import { claims, documents } from '../../../src/mockData';
import { requireSession } from '../middleware/session';
import { requireRole } from '../middleware/roles';
import { recordAuditEvent } from '../lib/auditLog';

const router = Router();

router.use(requireSession, requireRole(['raf_admin', 'raf_official', 'platform_admin']));

router.get('/claims', (_req, res) => {
  return res.json({ claims });
});

router.get('/claims/:claimId', async (req, res) => {
  const claim = claims.find((item) => item.id === req.params.claimId);

  if (!claim) {
    return res.status(404).json({ message: 'Claim not found.' });
  }

  await recordAuditEvent({
    actor: req.user,
    action: 'ADMIN_VIEWED_CLAIM',
    entityType: 'claim',
    entityId: claim.id
  });

  return res.json({ claim, documents });
});

router.patch('/claims/:claimId/status', async (req, res) => {
  await recordAuditEvent({
    actor: req.user,
    action: 'CLAIM_STATUS_UPDATED',
    entityType: 'claim',
    entityId: req.params.claimId,
    metadata: { nextStage: req.body.nextStage }
  });

  return res.json({
    claimId: req.params.claimId,
    nextStage: req.body.nextStage,
    updated: true
  });
});

export default router;

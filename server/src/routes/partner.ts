import { Router } from 'express';
import { claims, documents } from '../../../src/mockData';
import { requireSession } from '../middleware/session';
import { requireRole } from '../middleware/roles';
import { recordAuditEvent } from '../lib/auditLog';

const router = Router();

router.use(requireSession, requireRole(['partner', 'platform_admin']));

router.get('/assignments', async (req, res) => {
  await recordAuditEvent({
    actor: req.user,
    action: 'PARTNER_VIEWED_ASSIGNMENT',
    entityType: 'partner_assignment',
    entityId: req.user?.id
  });

  return res.json({
    assignments: claims.map((claim) => ({
      claimId: claim.id,
      reference: claim.reference,
      currentStage: claim.currentStage,
      allowedActions: ['view_status', 'upload_supporting_document']
    }))
  });
});

router.get('/assignments/:claimId/documents', (req, res) => {
  return res.json({ claimId: req.params.claimId, documents });
});

export default router;

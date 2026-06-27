import { Router } from 'express';
import { z } from 'zod';
import { claims, documents, messages, notifications, appointments } from '../../../src/mockData';
import { requireSession } from '../middleware/session';
import { requireRole } from '../middleware/roles';
import { recordAuditEvent } from '../lib/auditLog';

const router = Router();

const linkClaimSchema = z.object({
  reference: z.string().regex(/^RAF-[0-9]{4}-[0-9]{6}$/)
});

router.get('/bundle', requireSession, requireRole(['claimant']), (_req, res) => {
  return res.json({ claims, documents, messages, notifications, appointments });
});

router.post('/claims/link', requireSession, requireRole(['claimant']), async (req, res) => {
  const parsed = linkClaimSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid claim reference format.', errors: parsed.error.flatten() });
  }

  await recordAuditEvent({
    actor: req.user,
    action: 'CLAIM_LINKED',
    entityType: 'claim',
    entityId: parsed.data.reference
  });

  return res.status(201).json({
    reference: parsed.data.reference,
    linked: true,
    message: 'Claim linked successfully.'
  });
});

router.post('/claims/:claimId/documents', requireSession, requireRole(['claimant', 'partner']), async (req, res) => {
  await recordAuditEvent({
    actor: req.user,
    action: 'DOC_UPLOAD_REQUESTED',
    entityType: 'document',
    entityId: req.params.claimId,
    metadata: { documentType: req.body.documentType || 'unknown' }
  });

  return res.status(201).json({
    documentId: `doc_${Date.now()}`,
    claimId: req.params.claimId,
    status: 'Under review',
    uploadMode: 'signed-url-placeholder'
  });
});

export default router;

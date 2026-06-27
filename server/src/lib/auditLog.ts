import type { AuditAction, AuthUser } from '../types';

type AuditPayload = {
  actor?: AuthUser | null;
  action: AuditAction;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
};

export async function recordAuditEvent(payload: AuditPayload) {
  const auditEvent = {
    actorId: payload.actor?.id || 'system',
    actorRole: payload.actor?.role || 'system',
    action: payload.action,
    entityType: payload.entityType,
    entityId: payload.entityId || null,
    metadata: payload.metadata || {},
    createdAt: new Date().toISOString()
  };

  // Replace this with a database insert before production go-live.
  console.info('[raf-connect-audit]', JSON.stringify(auditEvent));

  return auditEvent;
}

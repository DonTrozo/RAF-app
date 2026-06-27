# Security Readiness Checklist

## Mobile App

- [ ] No production secrets committed to the repository
- [ ] Environment values loaded through Expo public environment variables only when safe for client exposure
- [ ] App validates claim reference format before submission
- [ ] App displays clear POPIA consent before account creation
- [ ] App handles API errors without exposing internal system details
- [ ] App supports forced logout when token expires
- [ ] App supports app version checks before production rollout

## API

- [ ] HTTPS enforced
- [ ] JWT authentication implemented
- [ ] Refresh-token rotation implemented
- [ ] Rate limiting enabled
- [ ] Input validation enabled on all endpoints
- [ ] Claim ownership checks enforced server-side
- [ ] Partner access limited to authorised claims
- [ ] Admin role-based permissions enforced
- [ ] Audit logging enabled for all sensitive actions

## Data

- [ ] Database encryption enabled
- [ ] File storage encryption enabled
- [ ] Signed URLs expire quickly
- [ ] Backups encrypted
- [ ] Sensitive fields masked in logs
- [ ] No raw ID numbers exposed in analytics tools

## Operations

- [ ] Incident response plan approved
- [ ] Production support process defined
- [ ] Monitoring and alerting enabled
- [ ] Error tracking enabled
- [ ] Release approval process defined
- [ ] Penetration test scheduled before pilot go-live

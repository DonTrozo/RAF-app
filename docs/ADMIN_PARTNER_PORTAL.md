# Admin and Partner Portal Starter

This document defines the first web portal scope for RAF officials, administrators, and authorised partners.

## Admin Portal

### Core Screens

- Admin sign-in
- Claims queue
- Claim profile
- Document review panel
- Claim timeline editor
- Missing document requests
- Appointment scheduler
- Escalation dashboard
- Audit trail viewer
- User and role management

### API Routes

Implemented starter routes:

```text
GET /admin/claims
GET /admin/claims/:claimId
PATCH /admin/claims/:claimId/status
```

### Admin Priorities

1. View claim workload
2. Open a claim file
3. See documents
4. Update claim stage
5. Record action history
6. Trigger claimant notifications later

## Partner Portal

### Core Screens

- Partner sign-in
- Assigned claims list
- Limited claim status view
- Supporting document upload
- RAF document request responses

### API Routes

Implemented starter routes:

```text
GET /partner/assignments
GET /partner/assignments/:claimId/documents
```

### Partner Priorities

1. See only assigned claims
2. Upload supporting files
3. Receive document requests
4. Avoid access to unauthorised claimant information

## Future Web Stack

Recommended stack:

- Next.js
- TypeScript
- Tailwind CSS
- Shared API client
- Shared role matrix
- Server-rendered admin views where appropriate

## MVP Rule

The mobile app is claimant-first. The web portal is operations-first. They should share backend services but not share the same UI assumptions.

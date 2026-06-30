# RAF Connect Mobile API Contract

This document defines the implemented backend contract for the current RAF Connect scaffold.

## Account Routes

### POST /accounts/register

Registers a claimant account and captures POPIA consent.

Request:

```json
{
  "fullName": "Demo Claimant",
  "idNumber": "9001015009087",
  "phone": "+27720000000",
  "email": "claimant@example.com",
  "password": "secure-password",
  "popiaConsentAccepted": true
}
```

Response:

```json
{
  "user": {
    "id": "user_demo_claimant",
    "email": "claimant@example.com",
    "fullName": "Demo Claimant",
    "role": "claimant"
  },
  "accessToken": "session-token"
}
```

### POST /accounts/sign-in

Signs in a claimant account.

Request:

```json
{
  "email": "claimant@example.com",
  "password": "secure-password"
}
```

Response:

```json
{
  "user": {
    "id": "user_demo_claimant",
    "email": "claimant@example.com",
    "fullName": "Demo Claimant",
    "role": "claimant"
  },
  "accessToken": "session-token"
}
```

### POST /accounts/consent/popia

Records POPIA consent for the authenticated user.

Response:

```json
{
  "accepted": true,
  "acceptedAt": "2026-06-30T12:00:00.000Z"
}
```

## Claimant Routes

### GET /mobile/bundle

Returns the mobile dashboard payload for the logged-in claimant.

Response:

```json
{
  "claims": [],
  "documents": [],
  "messages": [],
  "notifications": [],
  "appointments": []
}
```

### POST /mobile/claims/link

Links an existing RAF claim reference to the claimant profile.

Request:

```json
{
  "reference": "RAF-2026-014582"
}
```

Response:

```json
{
  "reference": "RAF-2026-014582",
  "linked": true,
  "message": "Claim linked successfully."
}
```

### POST /mobile/claims/:claimId/documents

Requests a document upload flow for a claim.

Request:

```json
{
  "documentType": "Medical report"
}
```

Response:

```json
{
  "documentId": "doc_001",
  "claimId": "claim-001",
  "status": "Under review",
  "uploadMode": "signed-url-placeholder"
}
```

## Admin Routes

### GET /admin/claims

Returns admin claim queue data.

### GET /admin/claims/:claimId

Returns one claim and its document list.

### PATCH /admin/claims/:claimId/status

Updates claim status placeholder.

Request:

```json
{
  "nextStage": "Medical review"
}
```

## Partner Routes

### GET /partner/assignments

Returns claim assignments for an authorised partner.

### GET /partner/assignments/:claimId/documents

Returns documents for an authorised partner assignment.

## Production Security Requirements

- All endpoints must require HTTPS.
- Claimant, admin, and partner routes must require a valid session.
- Claimants may only access claims linked to their verified identity.
- Admin actions must be written to an append-only action history.
- Files must be stored in encrypted private object storage.
- Upload links must expire quickly.
- Sensitive personal information must not be written to plaintext logs.

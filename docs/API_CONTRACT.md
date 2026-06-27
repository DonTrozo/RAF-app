# RAF Connect Mobile API Contract

This document defines the backend contract required to move the mobile app from mock mode to production mode.

## Authentication

### POST /auth/register

Registers a claimant account.

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
  "userId": "user_001",
  "accessToken": "jwt",
  "refreshToken": "jwt"
}
```

### POST /auth/login

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
  "accessToken": "jwt",
  "refreshToken": "jwt"
}
```

## Claimant Bundle

### GET /mobile/claimant/bundle

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

## Claim Linking

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

## Document Upload

### POST /mobile/claims/:claimId/documents

Uploads a supporting document. Production should use signed upload URLs or secure multipart upload.

Fields:

- documentType
- file
- claimantId
- claimId

Response:

```json
{
  "documentId": "doc_001",
  "status": "Under review"
}
```

## Security Requirements

- All endpoints must require HTTPS.
- All claimant endpoints must require authenticated JWT access.
- Claimants may only access claims linked to their verified identity.
- Admin actions must be written to an immutable audit log.
- Files must be stored in encrypted object storage.
- Signed URLs must expire.
- PII must not be written to plaintext logs.

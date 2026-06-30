# Production Connections

This file defines what must be connected before RAF Connect can be used as a real production system.

## Required external services

1. Production database
   - Recommended: managed PostgreSQL.
   - Required secret: DATABASE_URL.
   - Used for users, consent records, claims, documents, messages, assignments, and audit events.

2. Private file storage
   - Recommended: private S3-compatible bucket or managed object storage.
   - Required secrets: STORAGE_BUCKET, STORAGE_REGION, STORAGE_ACCESS_KEY_ID, STORAGE_SECRET_ACCESS_KEY.
   - Used for claim document uploads.

3. Backend hosting
   - Recommended: Render, Railway, Fly.io, AWS, Azure, or another Node-compatible host.
   - Required env vars: NODE_ENV=production, PORT, DATABASE_URL, JWT_SECRET, CORS_ORIGIN.

4. Mobile app secrets
   - Required env vars: EXPO_PUBLIC_API_BASE_URL, EXPO_PUBLIC_ENABLE_MOCKS=false.
   - Native builds should use secure token storage before public release.

5. RAF or third-party integration
   - Required: API documentation, endpoint URLs, test credentials, production credentials, data-sharing approval, and legal sign-off.
   - Until these are supplied, claim data can only be internal application data.

## Current repo state

The repo now supports a working product simulation and a backend scaffold. It is not connected to live external services until the secrets above are added and the backend is deployed.

## Go-live rule

Do not onboard real claimants until the app uses a live database, private file storage, verified identity checks, claim ownership checks, audit logging, HTTPS-only backend deployment, and signed legal/privacy approval.

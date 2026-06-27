# RAF Connect Mobile App

RAF Connect is a pilot-ready mobile application concept for the Road Accident Fund in South Africa.

The app is designed to help claimants track RAF claim progress, view missing documents, receive notifications, book appointments, and communicate with RAF officials through a secure claimant portal.

## Current Status

This repository contains an Expo React Native mobile app for Android and iOS with production-readiness scaffolding.

It is not connected to live RAF systems yet. The current app runs in mock mode and is structured so a backend API can be connected later.

## Built Screens

- Claimant dashboard
- Claim timeline
- Document vault
- Messages and appointment view
- Profile and security controls
- Bottom mobile navigation
- Mock claim data
- Mock document statuses
- Mock notifications
- Mock appointments

## Production-Readiness Additions

- Environment configuration template
- EAS Android/iOS build profiles
- TypeScript CI workflow
- Backend-ready API client
- Claim service abstraction
- Validation helpers
- API contract documentation
- POPIA/privacy readiness documentation
- Security checklist
- Release QA checklist

## Product Positioning

RAF Connect is not just a mobile app. It is a secure claims visibility layer between:

- claimants
- RAF officials
- attorneys
- medical providers
- approved third parties

The first version works without deep RAF API integration. It uses mock claim data and can later connect to RAF claim systems, identity verification, document storage, notifications, and payment-status services.

## Tech Stack

- Expo
- React Native
- TypeScript
- Android and iOS support
- Mock local data for MVP demo
- EAS build profiles
- GitHub Actions CI

## Project Structure

```text
App.tsx
src/
  api/
    client.ts
  services/
    claimsService.ts
  config.ts
  mockData.ts
  theme.ts
  types.ts
  validation.ts
docs/
  API_CONTRACT.md
  POPIA_AND_PRIVACY.md
  SECURITY_CHECKLIST.md
  RELEASE_QA.md
.github/workflows/ci.yml
.env.example
app.json
eas.json
package.json
tsconfig.json
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npm run start
```

Run Android:

```bash
npm run android
```

Run iOS:

```bash
npm run ios
```

Typecheck:

```bash
npm run typecheck
```

## Build Preview Apps

Android preview build:

```bash
npm run build:preview:android
```

iOS preview build:

```bash
npm run build:preview:ios
```

## MVP Acceptance Criteria

- Claimant can view an active RAF claim
- Claimant can see claim progress percentage
- Claimant can view claim timeline stages
- Claimant can view required documents
- Claimant can see missing document statuses
- Claimant can view notifications
- Claimant can view messages
- Claimant can view appointments
- Claimant can view profile and POPIA/security controls

## Go-Live Blockers

Before real production use, the following must still be implemented:

1. Backend API
2. Real authentication
3. POPIA consent capture
4. Claim reference verification
5. Secure document upload
6. Encrypted file storage
7. Role-based admin/partner access
8. Audit logging
9. Privacy policy and support process
10. Penetration/security test

## Commercial Direction

The MVP should support a RAF pilot proposal by demonstrating transparency, document completeness, claimant communication, and reduced administrative pressure.

# RAF Connect Mobile App

RAF Connect is a pilot-ready mobile application concept for the Road Accident Fund in South Africa.

The app is designed to help claimants track RAF claim progress, view missing documents, receive notifications, book appointments, and communicate with RAF officials through a secure claimant portal.

## Current MVP

This repository now contains an Expo React Native mobile MVP for Android and iOS.

### Built screens

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

## Project Structure

```text
App.tsx
src/
  mockData.ts
  types.ts
package.json
app.json
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

## Next Build Phase

The next phase should add:

1. Real navigation using Expo Router or React Navigation
2. Login and registration screens
3. POPIA consent flow
4. Claim reference linking form
5. Document upload interaction
6. Admin web portal
7. API backend
8. PostgreSQL database
9. Secure document storage
10. Notification provider integrations

## Commercial Direction

The MVP should support a RAF pilot proposal by demonstrating transparency, document completeness, claimant communication, and reduced administrative pressure.

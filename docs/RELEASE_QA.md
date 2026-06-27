# Release QA Checklist

Use this checklist before sharing the app with any RAF stakeholder, pilot partner, or investor.

## Build Checks

- [ ] `npm install` completes successfully
- [ ] `npm run typecheck` passes
- [ ] `npm run start` opens Expo without errors
- [ ] Android build runs on emulator or physical device
- [ ] iOS build runs on simulator or physical device
- [ ] Preview build generated through EAS

## Functional Checks

- [ ] Dashboard renders active claim
- [ ] Claim progress percentage displays correctly
- [ ] Claim timeline displays all stages
- [ ] Documents tab displays accepted, under-review, and missing documents
- [ ] Messages tab displays inbox and appointments
- [ ] Profile tab displays consent/security controls
- [ ] Bottom navigation works across all tabs
- [ ] Empty states are handled for missing data
- [ ] API error states are handled before mock mode is disabled

## Product Checks

- [ ] App name is RAF Connect
- [ ] Government-grade visual tone is maintained
- [ ] Copy avoids promising official RAF integration unless contract exists
- [ ] Privacy language is clear
- [ ] POPIA consent flow is implemented before production
- [ ] No real claimant information is included in demo data

## Pilot Demo Checks

- [ ] Demo claim narrative is realistic
- [ ] Missing documents demonstrate the core value
- [ ] Timeline demonstrates transparency
- [ ] Appointment and messages demonstrate service reduction
- [ ] App can be presented without backend dependency in mock mode

## Go-Live Blockers

The app is not production-ready until these are complete:

- real backend API
- authentication
- POPIA consent capture
- secure document upload
- encrypted storage
- role-based access control
- audit logs
- production privacy policy
- penetration/security test

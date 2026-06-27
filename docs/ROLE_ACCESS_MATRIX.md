# Role Access Matrix

## Roles

- claimant
- raf_admin
- raf_official
- partner
- platform_admin

## Claimant

Can:

- create claimant profile
- accept POPIA consent
- link a claim reference
- view own claim dashboard
- view own claim timeline
- view own document status
- request document upload
- view own messages and appointments

Cannot:

- view another claimant's profile
- change claim stage
- review documents
- access admin dashboard

## RAF Official

Can:

- view assigned claims
- view claimant profile for assigned claims
- view document status
- update claim stage
- add internal notes
- request missing documents
- schedule appointments

Cannot:

- access platform configuration
- view claims outside assigned scope unless policy allows it

## RAF Admin

Can:

- view claim queues
- assign claims
- update claim stage
- review document status
- manage escalation queues
- view audit trail summaries

Cannot:

- bypass audit logging
- access platform secrets

## Partner

Can:

- view assigned claim references
- view limited claim status
- upload supporting documents
- respond to document requests

Cannot:

- view full claimant profile unless authorised
- update claim stage
- access admin tools

## Platform Admin

Can:

- manage technical configuration
- manage user roles
- support production operations

Cannot:

- alter claim outcomes without RAF business authorisation
- bypass audit logging

## Rule

Every backend route must enforce role checks server-side. Mobile UI hiding is not enough.

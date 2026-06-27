# POPIA and Privacy Readiness

RAF Connect processes sensitive personal information and potentially health-related claim data. This document defines minimum privacy controls required before production use.

## Data Categories

The app may process:

- claimant identity details
- contact information
- RAF claim reference numbers
- accident details
- medical report metadata
- document upload metadata
- appointment information
- payment status information
- message history

## Consent

Before account creation or claim linking, the claimant must accept a clear POPIA consent statement explaining:

- what personal information is collected
- why it is collected
- who may access it
- how long it may be retained
- how the claimant can request correction or removal where legally allowed

## Access Control

Production must enforce:

- claimant-only access to own claims
- partner access only to assigned claims
- RAF official access based on role and office assignment
- platform admin access restricted to technical maintenance

## Storage

Production must use:

- encrypted database storage
- encrypted file/object storage
- no plaintext passwords
- short-lived signed URLs for documents
- secure key management

## Logging

Logs must not include:

- ID numbers
- full claim documents
- medical information
- full bank account numbers
- authentication tokens

## Audit Trail

The backend must log:

- account creation
- claim linking
- document upload
- document review
- status changes
- admin access to claim profiles
- message sending
- appointment changes

Audit logs must include:

- actor ID
- action
- entity type
- entity ID
- timestamp
- IP/device metadata where appropriate

## Production Privacy Checklist

- POPIA consent screen implemented
- privacy policy published
- data retention policy approved
- breach response process documented
- role-based access control tested
- audit logging enabled
- encrypted storage enabled
- production logs scrubbed for sensitive data
- support staff trained on claimant privacy

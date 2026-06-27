# Database Schema

This schema is the production data model for RAF Connect. It can be implemented in PostgreSQL through Prisma, Drizzle, Sequelize, or direct SQL migrations.

## Core Tables

### users

- id UUID primary key
- full_name text not null
- email text unique not null
- phone text
- identity_hash text
- credential_hash text not null
- role text not null default claimant
- popia_accepted_at timestamp
- created_at timestamp not null
- updated_at timestamp not null

Allowed roles:

- claimant
- raf_admin
- raf_official
- partner
- platform_admin

### claims

- id UUID primary key
- reference text unique not null
- claimant_id UUID references users(id)
- accident_date timestamp
- accident_location text
- current_stage text not null
- progress integer default 0
- assigned_office text
- risk_level text default Medium
- created_at timestamp not null
- updated_at timestamp not null

Allowed stages:

- claim_registered
- documents_pending
- documents_received
- under_assessment
- medical_review
- legal_review
- awaiting_decision
- approved
- payment_processing
- paid
- rejected
- escalated

### claim_documents

- id UUID primary key
- claim_id UUID references claims(id)
- document_type text not null
- file_url text
- status text not null default pending
- rejection_reason text
- uploaded_by_id UUID
- reviewed_by_id UUID
- uploaded_at timestamp not null
- reviewed_at timestamp

Allowed statuses:

- pending
- accepted
- rejected
- needs_resubmission
- under_review

### timeline_events

- id UUID primary key
- claim_id UUID references claims(id)
- title text not null
- detail text not null
- visible_to_claimant boolean default true
- created_at timestamp not null

### messages

- id UUID primary key
- claim_id UUID references claims(id)
- sender_id UUID not null
- receiver_id UUID
- body text not null
- created_at timestamp not null
- read_at timestamp

### appointments

- id UUID primary key
- claim_id UUID references claims(id)
- title text not null
- scheduled_at timestamp
- location text
- status text default Pending
- notes text
- created_at timestamp not null

### partner_assignments

- id UUID primary key
- partner_id UUID not null
- claim_id UUID not null
- permissions text array
- created_at timestamp not null

### audit_logs

- id UUID primary key
- actor_id UUID
- actor_role text
- action text not null
- entity_type text not null
- entity_id text
- metadata jsonb
- created_at timestamp not null

## Indexes

Recommended indexes:

- users.email
- users.role
- claims.reference
- claims.claimant_id
- claims.current_stage
- claim_documents.claim_id
- timeline_events.claim_id
- messages.claim_id
- appointments.claim_id
- partner_assignments.partner_id
- partner_assignments.claim_id
- audit_logs.actor_id
- audit_logs.entity_type
- audit_logs.entity_id
- audit_logs.created_at

## Production Notes

- Do not store raw identity numbers.
- Do not store plain credentials.
- Use encrypted object storage for files.
- Store file URLs as private object keys, not public links.
- Audit logs should be append-only.
- Claim ownership must be enforced server-side on every request.

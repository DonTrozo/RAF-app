# Action History System Design

RAF Connect needs a reliable action history for sensitive claim operations.

## Purpose

The action history proves who performed an operation, when it happened, and which claim or document was affected.

## Events to Record

- claimant profile creation
- POPIA consent accepted
- claim reference linked
- document upload requested
- document reviewed
- claim stage changed
- admin viewed claim
- partner viewed assignment
- appointment changed
- message sent

## Event Fields

Each event should store:

- id
- actor id
- actor role
- action
- entity type
- entity id
- metadata
- created at

## Production Rules

- Events must be append-only.
- Events should not be edited by normal users.
- Events should not store full medical content.
- Events should not store full identity numbers.
- Events should be queryable by claim, user, date, and action.
- Sensitive metadata must be minimised.

## Current Scaffold

The backend currently includes an event helper:

```text
server/src/lib/auditLog.ts
```

Routes call the helper when important actions happen. Before production, replace the console implementation with a database insert into the action history table.

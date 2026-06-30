# Backend Connection Steps

The codebase now has API service files for account creation, sign-in, consent, claim linking, dashboard loading, and document upload requests.

To make it live, add these environment variables to the deployed frontend:

- EXPO_PUBLIC_API_BASE_URL=https://your-backend-domain.com
- EXPO_PUBLIC_ENABLE_MOCKS=false
- EXPO_PUBLIC_APP_ENV=production

Deploy the backend from the server folder and add these backend variables:

- NODE_ENV=production
- PORT=4000
- DATABASE_URL=your-managed-postgres-url
- JWT_SECRET=long-random-secret
- CORS_ORIGIN=https://your-vercel-domain.vercel.app
- MOCK_MODE=false

The current blocker for full production is not the React UI. The blocker is external infrastructure: database credentials, private file storage credentials, backend hosting, and RAF or third-party API access.

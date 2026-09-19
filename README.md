# Qazangül School v2

Production-oriented UI/architecture. No demo login and no fake database records. Database-dependent actions intentionally remain disabled until Firebase is configured.

## Run locally
Use VS Code Live Server for static UI. `/api/*` endpoints require Vercel dev/deployment.

## Connect later
1. Create Firebase project. 2. Configure Firebase Admin credentials as Vercel environment variables. 3. Implement repository/auth adapter in API routes. 4. Apply security rules/indexes. 5. Turn `database.connected` on only after health check succeeds.

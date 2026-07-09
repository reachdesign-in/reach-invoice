# REACH INVOICE Online

Cloud-based billing and business management app for REACH Design.

The original UI/UX is preserved. The app now adds login, company-level data separation, PostgreSQL cloud storage, JSON migration/import, exports, and hosting-ready backend APIs.

## What Changed

- Business data is no longer stored permanently in browser-only local JSON/localStorage.
- Users login with email and password.
- Each account has its own company workspace.
- Invoices, quotations, clients, services, payments, projects, expenses, activities, and company settings are saved to PostgreSQL.
- Data reloads from the cloud on login, browser focus, and every 30 seconds for multi-device sync.
- Existing invoice print/PDF format and billing flow are kept.

## Tech Stack

- Frontend: existing React app, same screens and UX
- Backend: Node.js + Express
- Database: PostgreSQL
- Auth: JWT sessions + bcrypt password hashing
- Hosting: Render, Railway, VPS, or any Node hosting with PostgreSQL

## Setup

1. Install Node.js 20 or newer.
2. Create a PostgreSQL database on Supabase, Railway, Render, Neon, or your VPS.
3. Copy `.env.example` to `.env`.
4. Fill these values:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
DATABASE_SSL=true
JWT_SECRET=use-a-long-random-secret
PORT=3000
```

5. Install packages:

```bash
npm install
```

6. Create database tables and indexes:

```bash
npm run db:migrate
```

7. Start the online app:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## First Login

Use **Create new account** on the login screen.

That creates:

- Your user login
- Your company workspace
- Your private company settings

No user can access another company workspace because every API route is protected by the logged-in company ID.

## Import Old Offline Data

1. Open your old offline app.
2. Go to Export.
3. Download full backup JSON.
4. Open the new online app.
5. Login.
6. Go to Export.
7. Click **Import Backup JSON**.

The backend imports the JSON into PostgreSQL for the logged-in company.

## Exports

The Export page supports:

- Clients CSV
- Services CSV
- Quotations CSV
- Invoices CSV
- Payments CSV
- Projects CSV
- Expenses CSV
- Full backup JSON

## Security

- Passwords are hashed with bcrypt.
- API routes require JWT login.
- Database records are separated by `organization_id`.
- Invoice and quotation numbers are protected by unique PostgreSQL indexes per company.
- Secret keys stay in `.env`; do not put them in frontend files.
- Use HTTPS in production.

## Performance Notes

The database schema includes indexes for:

- Company + collection
- Date
- Status
- Client
- JSONB search
- Unique invoice numbers
- Unique quotation numbers

The backend also includes a paginated endpoint:

```text
GET /api/records/:key?limit=50&offset=0&search=&status=
```

This is ready for very large datasets such as 1,00,000 invoices. The current UI remains close to the original app and loads the company working data into memory for the same experience.

## Render Deployment

1. Push this folder to GitHub.
2. Create a PostgreSQL database.
3. Create a Render Web Service.
4. Set build command:

```bash
npm install && npm run db:migrate
```

5. Set start command:

```bash
npm start
```

6. Add environment variables:

```env
DATABASE_URL=...
DATABASE_SSL=true
JWT_SECRET=...
NODE_ENV=production
```

The included `render.yaml` can also be used.

## Railway Deployment

1. Create a Railway project.
2. Add PostgreSQL.
3. Add this repository/service.
4. Set `DATABASE_URL`, `DATABASE_SSL=true`, and `JWT_SECRET`.
5. Railway can use the included `railway.json`.

## VPS / Hostinger Setup

1. Install Node.js 20 and PostgreSQL.
2. Upload this folder.
3. Create `.env`.
4. Run:

```bash
npm install
npm run db:migrate
npm start
```

For production, run it behind Nginx with HTTPS and use a process manager such as PM2.

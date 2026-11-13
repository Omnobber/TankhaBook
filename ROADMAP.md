# TankhaBook 2026 - Roadmap (from the Master Development Prompt)

## Done (Phase 1)
- Brand colours, headline "Your Business. Your People. One Platform.", tagline, CTAs "Book a free demo" / "Try the live demo"
- Live phone demo running the new app (owner / manager / supervisor / worker logins)
- Demo-request form saves to MySQL (`leads`) and emails support@tankhabook.com; honeypot, validation, rate limit
- Secrets moved to `config.php` (copy `config.sample.php`)

## Done (Phase 2 - written, NOT yet tested on a live PHP/MySQL server)
- `migrations/002_core.sql`: companies, users, employees, audit_logs, login_attempts, password_resets
- `api/`: company registration, login/logout, password reset by email, CSRF, rate limiting, audit log, role checks; employee add/list/deactivate scoped to the logged-in company
- `portal.html`: login, sign-up, forgot password, employee list and add form
- Roles live today: owner, hr. Employee and contractor logins come with their portals.

## Needs real backend before it can be advertised (do in this order)
1. (Phase 2 done, needs live testing) Still to add: super admin, employee logins, branches/departments tables, backups
2. Attendance (GPS/geofence/selfie/QR/shifts/overtime) with server-side checks and audit trail
3. Payroll engine (salary structures, PF/ESI/TDS/PT, effective-dated rules, payslip PDF) - verify against current Indian rules with a CA
4. Employee, HR and Contractor portals, leave/advance/expense workflows
5. Subscriptions + Razorpay (needs your Razorpay keys), invoices
6. WhatsApp Business Cloud API (needs Meta approval, token, templates), PWA push
7. AI assistant (needs an API key; only over authorised tenant data), recruitment, mini ERP
8. Super Admin portal, lead dashboard, landing pages, real screenshots

## Not done / not claimed
Free trial, Razorpay, WhatsApp automation, biometric, OCR, AI assistant, Super Admin, contractor portal, recruitment, ERP, Bengali language.

# Deploy: GitHub -> Netlify (website) + Hostinger (API)

## 1. GitHub
Upload this whole folder to a new repo. `config.php` is git-ignored: never commit passwords.

## 2. Netlify (website)
Add new site -> Import from Git -> pick the repo. Publish directory: `site` (netlify.toml sets it). No build command.

## 3. Domain (DNS stays at Hostinger)
Netlify: Domain management -> add `www.tankhabook.com` as PRIMARY, and tankhabook.com.
Hostinger hPanel -> Domains -> DNS Zone:
- A record, name `@`  -> 75.2.60.5   (delete the old Hostinger A and any AAAA for `@`)
- CNAME, name `www`   -> YOUR-SITE-NAME.netlify.app
- KEEP all MX and TXT records (your email depends on them).
Wait for propagation, then Netlify -> Domain management -> Verify, then enable HTTPS (Let's Encrypt).

## 4. Hostinger (API + database)
1. hPanel -> Domains -> Subdomains -> create `api` (api.tankhabook.com). Enable SSL for it.
2. Databases -> create MySQL database + user. In phpMyAdmin import `database.sql`, `migrations/001_leads.sql`, `migrations/002_core.sql`.
3. Upload everything inside `backend/` to the subdomain's folder (public_html/api or as shown in hPanel).
4. In that folder copy `config.sample.php` to `config.php`, fill DB name/user/password. Keep SITE_URL and ALLOWED_ORIGINS as is.
5. Test: https://api.tankhabook.com/index.php?r=auth/csrf should return JSON with a csrf token.

## 5. Check
Open https://www.tankhabook.com -> send a demo request (row appears in `leads`) -> /portal.html -> create company, log in, add employee.
Note: Netlify preview URLs (*.netlify.app) cannot log in, because the API only trusts your own domain.

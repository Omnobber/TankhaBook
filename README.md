# TankhaBook – Hostinger Deployment Guide

## 📦 Files Included
```
tankhabook/
├── index.html       ← Main website
├── style.css        ← All styles
├── script.js        ← All JavaScript
├── contact.php      ← Form backend (PHP + MySQL)
├── database.sql     ← Database schema
└── README.md        ← This file
```

---

## 🚀 Step-by-Step Hostinger Upload

### 1. Upload Files
- Log in to **Hostinger hPanel**
- Go to **File Manager** → `public_html/`
- Upload all files: `index.html`, `style.css`, `script.js`, `contact.php`

### 2. Create MySQL Database
- In hPanel → **Databases** → **MySQL Databases**
- Create a new database (e.g., `u123456_tankhabook`)
- Create a database user and set a strong password
- Assign the user to the database with **All Privileges**

### 3. Import SQL
- Go to **phpMyAdmin** (hPanel → Databases → phpMyAdmin)
- Select your database
- Click **Import** → Choose `database.sql` → Click **Go**

### 4. Configure contact.php
Edit `contact.php` and update these lines:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456_tankhabook');   // Your DB name
define('DB_USER', 'u123456_dbuser');       // Your DB username
define('DB_PASS', 'yourStrongPassword');   // Your DB password
define('NOTIFY_EMAIL', 'your@email.com');  // Where to receive enquiries
```

### 5. Test
- Visit your domain → fill the contact form → check email + phpMyAdmin

---

## 🔐 Security Checklist
- [ ] Change DB credentials in `contact.php`
- [ ] Enable SSL (free in Hostinger hPanel → SSL)
- [ ] Set file permissions: `.php` = 644, folders = 755
- [ ] Remove sample data from `database.sql` before final deploy

---

## 📞 Support
- WhatsApp: https://wa.me/919234986070
- Email: support@tankhabook.com
- Phone: +91 92349 86070

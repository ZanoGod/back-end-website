# 🍳 FoodFusion Backend API

PHP Backend for FoodFusion - A Recipe Discovery & Community Platform

## 📋 Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

- ✅ User Registration & Authentication
- ✅ Session Management with Tokens
- ✅ Password Hashing (bcrypt)
- ✅ Input Validation & Sanitization
- ✅ CORS Support
- ✅ SQL Injection Protection (PDO Prepared Statements)
- ✅ XSS Protection
- ✅ Activity Logging
- ✅ RESTful API Design

---

## 🛠️ Requirements

- PHP 7.4 or higher (8.x recommended)
- MySQL 5.7 or higher (8.x recommended)
- Apache/Nginx web server
- Composer (optional, for dependencies)
- mod_rewrite enabled (for Apache)

---

## 📥 Installation

### 1. Clone or Download the Project

```bash
git clone https://github.com/yourusername/foodfusion-backend.git
cd foodfusion-backend
```

### 2. Create Database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE foodfusion CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Import Database Schema

```bash
mysql -u root -p foodfusion < database/schema.sql
```

### 4. Configure Apache/Nginx

**Apache (.htaccess is already included)**

Make sure mod_rewrite is enabled:

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

**Nginx Configuration Example:**

```nginx
server {
    listen 80;
    server_name api.foodfusion.local;
    root /var/www/foodfusion-backend;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### 5. Set Permissions

```bash
chmod 755 -R .
chmod 777 uploads/ logs/
```

### 6. Update Configuration

Edit `config/config.php` and update:

```php
// Database settings
define('DB_HOST', 'localhost');
define('DB_NAME', 'foodfusion');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');

// Security
define('JWT_SECRET', 'your-random-secret-key-here');

// CORS
define('CORS_ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'https://your-frontend-domain.com'
]);
```

---

## ⚙️ Configuration

### Environment Variables (Optional)

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_NAME=foodfusion
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your-secret-key
APP_ENV=development
```

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:8080
```

### Authentication Endpoints

#### 1. Register User (Signup)

```http
POST /api/signup.php
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "Account created successfully! Welcome to FoodFusion!",
  "data": {
    "token": "abc123...xyz789",
    "expires_at": "2025-10-18 10:30:00",
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "created_at": "2025-10-11 10:30:00",
      "is_active": true,
      "email_verified": false
    }
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "This email address is already registered",
  "data": null
}
```

---

#### 2. Login User

```http
POST /api/login.php
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful! Welcome back to FoodFusion!",
  "data": {
    "token": "def456...uvw012",
    "expires_at": "2025-10-18 11:00:00",
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "last_login": "2025-10-11 11:00:00"
    }
  }
}
```

**Error Response (401):**

```json
{
  "success": false,
  "message": "Invalid email or password",
  "data": null
}
```

---

#### 3. Logout User

```http
POST /api/logout.php
Authorization: Bearer {token}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Logged out successfully. See you soon!",
  "data": null
}
```

---

#### 4. Get User Profile (Protected)

```http
GET /api/profile.php
Authorization: Bearer {token}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "created_at": "2025-10-11 10:30:00",
    "last_login": "2025-10-11 11:00:00",
    "is_active": true,
    "email_verified": false
  }
}
```

---

#### 5. Update User Profile (Protected)

```http
PUT /api/profile.php
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Smith",
    "email": "john@example.com"
  }
}
```

---

## 🧪 Testing with cURL

### Test Signup

```bash
curl -X POST http://localhost:8080/api/signup.php \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:8080/api/login.php \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "SecurePass123"
  }'
```

### Test Profile (Replace TOKEN with your actual token)

```bash
curl -X GET http://localhost:8080/api/profile.php \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Test Logout

```bash
curl -X POST http://localhost:8080/api/logout.php \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔐 Security Features

### Password Security

- Bcrypt hashing with cost factor 12
- Minimum 8 characters
- Must contain uppercase, lowercase, and number
- Never stored in plain text

### Session Security

- 128-character random tokens
- 7-day expiration (configurable)
- IP address tracking
- User agent logging
- Automatic cleanup of expired sessions

### Input Validation

- Sanitization of all user inputs
- Email format validation
- SQL injection prevention (PDO prepared statements)
- XSS prevention (output escaping)

### CORS

- Whitelist-based origin control
- Credentials support
- Preflight request handling

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Error

```
Error: Database connection failed
```

**Solution:** Check database credentials in `config/config.php`

#### 2. CORS Error

```
Access to fetch has been blocked by CORS policy
```

**Solution:** Add your frontend URL to `CORS_ALLOWED_ORIGINS` in config.php

#### 3. 404 Not Found

```
Endpoint not found
```

**Solution:** Check Apache mod_rewrite is enabled or use full paths with .php

#### 4. Permission Denied

```
Warning: fopen(): failed to open stream
```

**Solution:**

```bash
chmod 777 uploads/ logs/
```

#### 5. Session Not Working

```
Invalid or expired session
```

**Solution:** Check if session_token is being sent in Authorization header or cookies

---

## 📝 Logs

Application logs are stored in:

```
logs/app.log
```

View logs:

```bash
tail -f logs/app.log
```

---

## 🚀 Deployment

### Production Checklist

- [ ] Set `display_errors = Off` in php.ini
- [ ] Change JWT_SECRET to a secure random string
- [ ] Update CORS_ALLOWED_ORIGINS with production domains
- [ ] Enable HTTPS (set `secure` cookie flag to true)
- [ ] Set up regular database backups
- [ ] Configure proper file upload limits
- [ ] Set up monitoring and error reporting
- [ ] Review and restrict file permissions
- [ ] Enable all security headers in .htaccess

---

## 📚 Additional Resources

- [PHP Documentation](https://www.php.net/docs.php)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PDO Tutorial](https://www.php.net/manual/en/book.pdo.php)
- [REST API Best Practices](https://restfulapi.net/)

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Support

For issues or questions:

- Email: support@foodfusion.com
- GitHub: [Issues](https://github.com/yourusername/foodfusion-backend/issues)

---

**Built with ❤️ by FoodFusion Team**

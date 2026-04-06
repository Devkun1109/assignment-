# Finance Dashboard Backend

## 📌 Overview

A backend system for managing financial records with role-based access control and analytics APIs.

Built using Node.js, Express, and PostgreSQL.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* PostgreSQL

---

## 📦 Packages Used

* express → server framework
* pg → PostgreSQL client
* dotenv → environment variables
* cors → cross-origin support
* morgan → request logging
* jsonwebtoken → authentication (JWT)
* bcrypt → password hashing
* zod → input validation
* swagger-ui-express → API documentation UI
* swagger-jsdoc → generate Swagger docs
* nodemon → development server

---

## 🔐 Features

* JWT-based authentication (register/login)
* Role-based access control (Viewer, Analyst, Admin)
* Financial transactions CRUD
* Filtering by:

  * type
  * category
  * date range
* Pagination support
* Soft delete functionality
* Analytics APIs:

  * Total income
  * Total expenses
  * Net balance
  * Category-wise totals
  * Monthly trends
  * Recent activity

---

## 👥 Roles & Permissions

| Action             | Viewer | Analyst | Admin |
| ------------------ | ------ | ------- | ----- |
| View Analytics     | ✅      | ✅       | ✅     |
| View Transactions  | ❌      | ✅       | ✅     |
| Create Transaction | ❌      | ❌       | ✅     |
| Update/Delete      | ❌      | ❌       | ✅     |
| Manage Users       | ❌      | ❌       | ✅     |

---

## 📡 API Endpoints

### 🔐 Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### 💳 Transactions

* POST `/api/transactions`
* GET `/api/transactions?page=&limit=&type=&category_id=`
* PUT `/api/transactions/:id`
* DELETE `/api/transactions/:id`

### 📊 Analytics

* GET `/api/analytics/summary`
* GET `/api/analytics/category`
* GET `/api/analytics/recent`
* GET `/api/analytics/monthly`

---

## 📄 API Documentation

Swagger UI available at:

```id="swgr1"
http://localhost:5000/api-docs
```

---

## 🗄️ Database Design

* Users linked to roles (normalized)
* Transactions linked to users and categories
* Categories separated for normalization
* Soft delete implemented using `deleted_at`
* Designed using 3NF principles

---

## ⚙️ Setup Instructions

1. Clone repository
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create `.env` file
4. Setup PostgreSQL database
5. Run schema.sql
6. Start server:

   ```bash
   npm run dev
   ```

---

## 🔑 Environment Variables

```id="env12"
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

---

## 🧪 Demo Credentials

```id="demo1"
Email: dev@test.com
Password: 12345
```

---

## 📌 Assumptions

* Single organization system
* One role per user
* Currency assumed as INR
* Transactions belong to one user

---

## 🔧 Improvements (Future Scope)

* Refresh tokens
* Rate limiting
* Unit testing
* API versioning
* Frontend integration

---

## 📎 Submission

* GitHub Repo: <your-link>

---

# Backend Wednesday Task

Node.js Express API with JWT authentication, role-based authorization, validation (Zod), and in-memory user/product data.

## Install

```bash
npm install
```

## Environment variables

Create a `.env` file in the project root:

| Variable       | Description                         
|----------------|-------------------------------------
| `PORT`         | Server port                          
| `JWT_SECRET`   | Secret used to sign JWT tokens      
| `SALT_ROUNDS`  | bcrypt salt rounds for password hash 

## Start

```bash
# production
npm start

# development (nodemon)
npm run dev
```

Server listens on `http://localhost:PORT`.

## Seed credentials

| Email                 | Password     | Role  |
|-----------------------|--------------|-------|
| `user1@example.com`    | `User1@123`   | user  |
| `user2@example.com` | `User2@123`| user  |
| `admin@example.com`    | `Admin@123`   | admin |

## Endpoints

| Method | Path                 | Auth        | Roles       | Description              |
|--------|----------------------|-------------|-------------|--------------------------|
| `GET`  | `/`                  | None        | —           | Health / welcome         |
| `POST` | `/api/auth/register` | None        | —           | Register a new user      |
| `POST` | `/api/auth/login`    | None        | —           | Login and receive JWT    |
| `GET`  | `/api/products`      | Bearer JWT  | admin, user | List all products        |
| `GET`  | `/api/products/:id`  | Bearer JWT  | admin, user | Get a product by ID      |
| `POST` | `/api/products`      | Bearer JWT  | admin       | Create a product         |
| `PUT`  | `/api/products/:id`  | Bearer JWT  | admin       | Update a product         |
| `DELETE` | `/api/products/:id`| Bearer JWT  | admin       | Delete a product         |
| `GET`  | `/role/admin`        | Bearer JWT  | admin       | Admin dashboard          |
| `GET`  | `/role/user`         | Bearer JWT  | admin, user | User dashboard           |

## Access control matrix

| Action                 | Anonymous | user | admin |
|------------------------|-----------|------|-------|
| Register / Login       | Yes       | Yes  | Yes   |
| List products          | No        | Yes  | Yes   |
| Get product by ID      | No        | Yes  | Yes   |
| Create / Update / Delete product | No | No   | Yes   |
| `/role/admin`          | No        | No   | Yes   |
| `/role/user`           | No        | Yes  | Yes   |

## How to test auth / authz

### 1. Login (get a token)

```bash
curl -s -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@example.com","password":"User1@123"}'
```

Copy the `token` from the response.

### 2. Call a protected route

```bash
# Admin-only: create product
curl -s -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Notebook","description":"A4 ruled notebook","price":5.99}'

# Authenticated (admin or user): list products
curl -s http://localhost:8000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Verify authorization

Login as a **user** (`user2@example.com` / `User2@123`) and try `POST /api/products` — expect **403**.

Login as **admin** (`admin@example.com` / `Admin@123`) and call the same — expect **201**.

Missing or invalid Bearer token — expect **401**.

### Register password rules

Password must be at least 6 characters and include uppercase, lowercase, a number, and a special character. Role must be `admin` or `user`.

## Rate limiting

- Global: 3 requests / 15 minutes
- Auth (`/api/auth/register`, `/api/auth/login`): 3 requests / 15 minutes
# Express-Backend

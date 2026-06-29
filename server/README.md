# RFQ-QCR API Server

Express API for RFQ-QCR authentication and user management.

## Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` and set a strong `JWT_SECRET` for production.

## Development

```bash
npm run dev
```

The API runs at `http://localhost:3001`.

## Endpoints

### `POST /api/auth/signup`

Create a new user account.

**Request body:**

```json
{
  "fullName": "Jane Smith",
  "company": "Acme Insurance",
  "email": "jane@acme.com",
  "password": "securePass1"
}
```

**Success (`201`):**

```json
{
  "message": "Account created successfully",
  "user": {
    "id": "uuid",
    "fullName": "Jane Smith",
    "company": "Acme Insurance",
    "email": "jane@acme.com",
    "createdAt": "2026-06-29T18:00:00.000Z"
  },
  "token": "jwt-token"
}
```

**Errors:**

- `400` — validation failed (`fields` object with per-field messages)
- `409` — email already registered (`field: "email"`)

User data is stored in SQLite at `server/data/rfq-qcr.db`.

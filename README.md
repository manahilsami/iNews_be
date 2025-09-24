# iNews Backend (iNews_be)

Express + MongoDB backend for NewsExplorer. Provides user authentication and saved articles API used by the frontend.

## Frontend

- Production frontend: http://newsexplorer.fpr.net

## Features

- JWT authentication (signup/signin)
- Save, list, and delete user-specific news articles
- Request/ error logging with winston
- Input validation via celebrate/Joi (see `middlewares/validation.js`)
- CORS enabled

## Tech Stack

- Node.js, Express
- MongoDB, Mongoose
- JSON Web Tokens (JWT)
- celebrate/Joi, winston/express-winston
- dotenv

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally or accessible via connection string

### Installation

```bash
cd iNews_be
npm install
```

### Environment Variables

Create a `.env` file in `iNews_be/` (same folder as `app.js`). Supported variables:

- `PORT` — server port, defaults to `3002` (note: app currently listens on 3002 explicitly)
- `MONGODB_URI` — Mongo connection string (currently hardcoded to `mongodb://127.0.0.1:27017/wtwr_db` in `app.js`; update `app.js` to use this var if desired)
- `JWT_SECRET` — secret for signing JWTs (defaults to `super-strong-secret`)

Example `.env`:

```env
PORT=3002
MONGODB_URI=mongodb://127.0.0.1:27017/wtwr_db
JWT_SECRET=change-me
```

### Running Locally

```bash
npm run start
```

This uses `nodemon` to run `app.js` and restart on file changes.

The server listens on http://localhost:3002 by default.

### API Overview

Base URL: `http://localhost:3002`

Auth (public):

- `POST /signup` — create user
  - body: `{ "email": string, "password": string, "username": string }`
- `POST /signin` — login
  - body: `{ "email": string, "password": string }`
  - response: `{ token: string }`

Authenticated (requires `Authorization: Bearer <token>`):

- `GET /users/me` — current user profile
- `GET /articles` — list saved articles for current user
- `POST /articles` — save article
  - body: `{ title, description, image, source, date, link, keyword }`
- `DELETE /articles/:articleId` — delete article by id (must belong to user)

### Validation and Errors

- Validation with celebrate/Joi in `middlewares/validation.js`
- Centralized errors in `utils/customErrors.js` and `utils/errors.js`
- Unknown routes return 404 via `routes/index.js`

### Logs

- Requests: `request.log`
- Errors: `error.log`

### Project Structure

```
iNews_be/
	app.js
	controllers/
	middlewares/
	models/
	routes/
	utils/
```

### Notes

- In `app.js`, MongoDB URI is currently hardcoded; consider switching to `process.env.MONGODB_URI`.
- CORS is enabled for all origins; tighten as needed for production.

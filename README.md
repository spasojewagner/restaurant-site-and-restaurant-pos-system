# Restaurant Website & POS System

A restaurant's public website with online ordering and table reservations, plus a point-of-sale app for the staff. Both talk to one Node.js API.

| App | Folder | What it does |
|---|---|---|
| Customer website | `fast-food/` | Menu by category, cart and checkout with PayPal, table reservations, reviews |
| POS for staff | `pos-frontend/` | Sign-in, tables, taking orders from the menu, bills with PayPal or cash, invoices, orders and a dashboard |
| API | `pos-backend/` | Express + MongoDB: users with JWT cookies, orders, tables, payments, reservations, reviews |

## Tech stack

- **Customer website:** React, Vite, styled-components, Swiper, PayPal JS SDK
- **POS:** React, Vite, Redux Toolkit, TanStack Query, Tailwind CSS, Framer Motion
- **API:** Node.js, Express, MongoDB with Mongoose, JWT in httpOnly cookies, bcrypt, PayPal Checkout SDK with webhook verification

## API

| Route | |
|---|---|
| `POST /api/user/register`, `POST /api/user/login`, `POST /api/user/logout`, `GET /api/user` | staff accounts |
| `GET/POST /api/order`, `GET/PUT/DELETE /api/order/:id` | orders (staff only) |
| `GET/POST /api/table`, `PUT /api/table/:id` | tables (staff only) |
| `POST /api/payment/create-order`, `POST /api/payment/verify-payment`, `POST /api/payment/cash-payment`, `GET /api/payment` | payments |
| `POST /api/payment/webhook-verification` | PayPal webhook |
| `GET/POST /api/reservations`, `PUT/DELETE /api/reservations/:id` | reservations from the website |
| `GET/POST /api/reviews`, `DELETE /api/reviews/:id` | reviews |

## Running it locally

You need Node.js 18+ and MongoDB, either local or Atlas. For payments, create a PayPal **sandbox** app at [developer.paypal.com](https://developer.paypal.com).

```bash
# API (http://localhost:8000)
cd pos-backend
cp .env.example .env        # fill in MONGODB_URI, JWT_SECRET and the PayPal sandbox keys
npm install
npm run dev

# POS (http://localhost:5173)
cd ../pos-frontend
cp .env.example .env
npm install
npm run dev

# Customer website (http://localhost:5174)
cd ../fast-food
cp .env.example .env
npm install
npm run dev -- --port 5174
```

The API accepts requests from `localhost:5173` and `localhost:5174`.

## Notes

- `.env` files are not committed. Each app has a `.env.example` with the variables it reads. Vite only reads `.env` from the app folder, not from `src/`.
- Reservations and reviews can be changed from the public website without an account. That suits a demo, but a real deployment should move those actions behind staff sign-in.

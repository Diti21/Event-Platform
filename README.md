

# Event Management Platform

A full-stack Event Management Platform built during the Designare Internship. It enables users to browse public events, register and pay, and allows organizers to manage participants and send bulk emails through a queued background system.

## Overview

This platform supports:

- Public event browsing
- Secure event registration and payments
- Confirmation email delivery
- Admin tools for managing registrants and sending emails

Built with:

- React, Next.js (App Router), Tailwind CSS
- Node.js, Express, TypeScript
- PostgreSQL, Prisma ORM
- JWT Authentication, Resend/Nodemailer for emails
- Redis and BullMQ for background job queues
- Docker for containerization

## Tech Stack

| Layer         | Tools / Libraries                         |
|---------------|--------------------------------------------|
| Frontend      | React, Next.js (App Router), Tailwind CSS, Axios |
| Backend       | Node.js, Express.js, TypeScript           |
| Database      | PostgreSQL, Prisma ORM                    |
| Auth & Email  | JWT, Bcrypt, Resend (or Nodemailer), Helmet, Rate Limiter |
| Queues        | Redis, BullMQ                             |
| Deployment    | Docker, Railway (or Vercel for frontend), GitHub |

## Features

### User Features

- View all upcoming events
- Register and make payments via Razorpay
- Receive automated confirmation emails

### Admin / Organizer Features

- Filter registrants by paid status
- Send bulk emails to paid participants
- Use Redis + BullMQ for background email job queueing
- Monitor logs and email status

## Folder Structure

backend/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── queues/
│ │ ├── emailQueue.ts
│ │ └── emailWorker.ts
│ ├── prisma/
│ │ └── schema.prisma
│ └── index.ts
├── .env
├── Dockerfile
└── package.json



## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourname/event-platform.git
cd event-platform

2. Backend Setup
cd backend
npm install

Create a .env file with the following environment variables:
DATABASE_URL=postgresql://...
EMAIL_KEY=your_resend_api_key
EMAIL_FROM=hello@youremail.com
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret

Run Prisma migrations:
npx prisma migrate dev

Start Redis locally (if using Docker):
docker run -p 6379:6379 redis

Start the backend server:
npm run dev
Start the email worker in a second terminal:
npx ts-node src/queues/emailWorker.ts

3. Frontend Setup
cd frontend
npm install
npm run dev
Bulk Email Flow
Admin sends a POST request to /registrant/bulkemail with subject, body, and eventSlug

Backend queues the job in BullMQ

The worker (emailWorker.ts) consumes the job and sends the email via Resend or Nodemailer

Logs success or failure

Benefits:
No crashes for 1000+ emails

Supports retry on failure

Enables performance monitoring

API Endpoints
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Login and receive JWT
GET	/events	Get all events
POST	/register	Register a user for an event
POST	/payment/verify	Verify Razorpay payment
POST	/registrant/bulkemail	Admin-only endpoint to send bulk emails

Testing
Use Postman to test /auth, /register, /payment, and /bulkemail routes

Run Redis and the email worker

Monitor logs from emailWorker.ts for delivery status

Optimizations
Email queueing to avoid backend bottlenecks

Secure routes with JWT, Helmet, and Rate Limiters

Background processing for heavy tasks using Redis + BullMQ

Lazy loading components where necessary for UX

Future Scope
Add Redis monitoring dashboard (Arena, BullBoard)

Build admin dashboard to view email statistics

Integrate SMS/WhatsApp notifications

Add email templates and analytics

Add pagination for event lists

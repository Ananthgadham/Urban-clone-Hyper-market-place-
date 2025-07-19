# Urban Company Clone - MERN Stack Project

This is a full-stack clone of the Urban Company platform that we built using the MERN stack. 
It has all the core features like user login/signup, booking services, adding to cart, reviews, and a separate admin panel to manage providers and services.


---

## Features

### User Side (frontend)
- User registration and login (email/password and Google OAuth)
- Location and service search
- Add services to cart (with provider selection)
- Book services with date and time
- Stripe payment integration
- View and manage bookings
- Submit reviews
- Responsive UI for mobile and desktop

### Admin Panel
- Admin login
- Add/view/delete providers
- Add/update/delete services
- View all bookings and reviews

### Backend
- REST API with Express.js
- MongoDB with Mongoose
- JWT and cookie-based authentication
- Google OAuth using Passport.js
- File uploads using Multer (for service images)
- Handles logic for users, bookings, reviews, providers, and services

---

## Tech Stack

- React + Vite + Tailwind CSS (Frontend)
- Node.js + Express (Backend)
- MongoDB + Mongoose (Database)
- JWT + Cookies for auth
---

## How to Run the Project

1. Clone the repo:

```bash
git clone git@github.com:ananth-gadham/Urban-clone.git
cd Urban-clone

- Google OAuth2
- Stripe for payments
- Multer for image upload

---

## Environment Variables (backend/.env)

PORT=5555
MONGO_URI=your-mongodb-uri
JWT_SECRET=urbansecret123
STRIPE_SECRET_KEY=your-stripe-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret


---

## How to Run the Project

1. Clone the repo:

```bash
git clone git@github.com:ananth-gadham/Urban-clone.git
cd Urban-clone
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev

cd ../admin-panel
npm install
npm run dev

Now you can open:

User site → http://localhost:5173

Admin panel → http://localhost:5174

Backend API → http://localhost:5555

Future Improvements:-

Add notifications

Real-time chat between user and provider

Dashboard stats for admin

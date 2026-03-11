import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import connectDB from './config/db.js';

import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import providerRoutes from './routes/providerRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// ✅ Required for Render / production proxies
app.set("trust proxy", 1);

// ✅ CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",                 // user frontend local
    "http://localhost:5174",                 // admin frontend local
    "https://fronted-urban.onrender.co",    // deployed user frontend
    "https://admin-urban.onrender.com"       // deployed admin panel
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// ✅ JSON & Cookie parser
app.use(express.json());
app.use(cookieParser());

// ✅ Session setup
app.use(session({
  secret: process.env.JWT_SECRET || "urbansecret123",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Test route
app.get('/', (req, res) => {
  res.send('🌐 Urban Company Clone API is running...');
});

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Static uploads
app.use('/uploads', express.static('uploads'));

// ✅ Start Server
const PORT = process.env.PORT || 5555;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  });
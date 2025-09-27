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

// ✅ CORS – must be first!
app.use(cors({
  origin: 'https://urbanfrontend.onrender.com',  // frontend
  credentials: true,
}));

// ✅ JSON parser & Cookie parser
app.use(express.json());
app.use(cookieParser());

// ✅ Session setup
app.use(session({
  secret: process.env.JWT_SECRET || 'urbansecret123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,            // true in production with HTTPS
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,  // 1 day
  },
}));

// ✅ Passport init
app.use(passport.initialize());
app.use(passport.session());

// ✅ Test route
app.get('/', (req, res) => {
  res.send('🌐 Urban Company Clone API is running...');
});

// ✅ Mount all routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/uploads', express.static('uploads'));

// ✅ Start server
const PORT = process.env.PORT || 5555;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  });

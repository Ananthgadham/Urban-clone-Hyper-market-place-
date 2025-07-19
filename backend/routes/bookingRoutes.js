import express from 'express';
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  getAllBookings
} from '../controllers/bookingController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { updateBookingStatus } from '../controllers/bookingController.js';
const router = express.Router();

// Create a booking (User)
router.post('/create/:serviceId/:providerId', authMiddleware, createBooking);


// Get all bookings for logged-in user
router.get('/my', authMiddleware, getUserBookings);

// Cancel booking by booking ID
router.delete('/:bookingId', authMiddleware, cancelBooking);

// Get all bookings (Admin only)
router.get('/', authMiddleware, adminMiddleware, getAllBookings);

// routes/bookingRoutes.js

//router.patch('/:bookingId/:status', updateBookingStatus);
// PUT: Update booking status by ID
router.put('/:id/status',authMiddleware,updateBookingStatus);
router.put('/cancel/:bookingId',authMiddleware, cancelBooking);




export default router;

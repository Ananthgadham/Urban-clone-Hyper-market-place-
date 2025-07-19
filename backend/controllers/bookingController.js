import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import ServiceProvider from '../models/ServiceProvider.js';   
import dotenv from 'dotenv';
dotenv.config(); // Required to load .env if it isn't already loaded

// @desc    Create a booking
// @route   POST /api/bookings/:serviceId/:providerId
// @access  Private (User)
// controllers/bookingController.js


export const createBooking = async (req, res) => {
  console.log("Booking route hit");

  const { serviceId, providerId } = req.params;
  const { bookingDate, address, payNow } = req.body;

  if (!serviceId || !providerId || !bookingDate || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const provider = await ServiceProvider.findById(providerId);
    if (!provider) return res.status(404).json({ message: "Provider not found" });

    const booking = new Booking({
      user: req.user._id,
      service: serviceId,
      provider: providerId,
      address,
      bookingDate,
      payNow,
      status: "pending",
    });

    const savedBooking = await booking.save();
    await savedBooking.populate([
      { path: "user", select: "name email" },
      { path: "service", select: "name description" },
      { path: "provider", select: "name experience" },
    ]);

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Booking Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


  
// @desc    Get all bookings for logged-in user
// @route   GET /api/bookings/my
// @access  Private (User)
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('service', 'name price')
      .populate('provider', 'name location phone')
      .populate("review"); 
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:bookingId
// @access  Private (User)
// controllers/bookingController.js
export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only user who booked or admin can cancel
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    // Only pending bookings can be canceled
    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Only pending bookings can be canceled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('service', 'name price')
      .populate('provider', 'name location');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// controllers/bookingController.js

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['completed', 'cancelled'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status update' });
  }

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Only admin can mark as completed
    if (status === 'completed' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can mark as completed' });
    }

    // User or admin can cancel
    if (
      status === 'cancelled' &&
      req.user._id.toString() !== booking.user.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: `Booking marked as ${status}`, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  // controllers/bookingController.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const markBookingAsPaid = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    const { paymentId } = req.body;

    const intent = await stripe.paymentIntents.retrieve(paymentId);
    if (intent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not successful' });
    }

    booking.paymentStatus = 'paid';
    booking.stripePaymentId = paymentId;
    await booking.save();

    res.status(200).json({ message: 'Payment verified', booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to verify payment', error: err.message });
  }
};

  
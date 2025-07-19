// controllers/stripeController.js
import Stripe from 'stripe';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    const service = await Service.findById(booking.service);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: service.price * 100,
      currency: 'inr',
      metadata: { bookingId },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: 'Stripe Error', error: err.message });
  }
};

// controllers/paymentController.js
import Razorpay from 'razorpay';

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  const { amount, bookingId } = req.body;

  try {
    const options = {
      amount: amount * 100, // convert to paise
      currency: 'INR',
      receipt: `order_rcptid_${bookingId}`,
    };

    const order = await instance.orders.create(options);

    res.json({ orderId: order.id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};


export const confirmPayment = async (req, res) => {
    const { bookingId, razorpayPaymentId, razorpayOrderId } = req.body;
  
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
      booking.paymentStatus = 'paid';
      booking.razorpayPaymentId = razorpayPaymentId;
      booking.razorpayOrderId = razorpayOrderId;
      await booking.save();
  
      res.json({ message: 'Payment confirmed and booking updated' });
    } catch (err) {
      res.status(500).json({ message: 'Error confirming payment', error: err.message });
    }
  };
  
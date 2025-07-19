import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
export const createReview = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { rating, comment } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized to review this booking" });

    if (booking.review)
      return res.status(400).json({ message: "Review already submitted" });

    const review = new Review({
      user: req.user._id,
      booking: bookingId,
      service: booking.service,
      provider: booking.provider,
      rating,
      comment,
    });

    await review.save();

    booking.review = review._id;
    await booking.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviewsByService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reviews = await Review.find({ service: serviceId })
      .populate("user", "name")
      .populate("provider", "name");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// controllers/reviewController.js


export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name")         // populate user name
      .populate("service", "name")      // populate service name
      .populate("provider", "name");    // optional: populate provider name

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete review (admin only)
export const deleteReviewByAdmin = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error while deleting review' });
  }
};

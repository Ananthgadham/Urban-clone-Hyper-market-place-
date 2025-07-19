// seedReviews.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Review from './models/Review.js';
import Booking from './models/Booking.js';
import User from './models/User.js';
import Service from './models/Service.js';
import ServiceProvider from './models/ServiceProvider.js';
import connectDB from './config/db.js';

dotenv.config();

const seedReviews = async () => {
  try {
    await connectDB();

    const users = await User.find().limit(3);
    const services = await Service.find().limit(3);
    const providers = await ServiceProvider.find().limit(3);
    const bookings = await Booking.find().limit(10);

    if (!users.length || !services.length || !providers.length || !bookings.length) {
      console.log('You need at least some users, services, providers and bookings in the DB to seed reviews.');
      return;
    }

    const reviewData = [];

    for (let i = 0; i < 10; i++) {
      const review = {
        user: users[i % users.length]._id,
        provider: providers[i % providers.length]._id,
        service: services[i % services.length]._id,
        booking: bookings[i % bookings.length]._id,
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        comment: [
          "Excellent service!",
          "Very professional and timely.",
          "Highly recommend!",
          "Great job, satisfied!",
          "Will book again for sure."
        ][i % 5]
      };
      reviewData.push(review);
    }

    await Review.deleteMany(); // Optional: clean existing reviews
    await Review.insertMany(reviewData);

    console.log("✅ Reviews seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding reviews:", err.message);
    process.exit(1);
  }
};

seedReviews();

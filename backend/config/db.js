import mongoose from 'mongoose';

/**
 * Connect to MongoDB using MONGO_URI from .env
 */
const connectDB = async () => {
  try {
    // Attempt to connect using the environment variable
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // If successful, print the host name
    console.log(`✅ MongoDB Connected`);
  } catch (error) {
    // If error occurs, log it and exit the process
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Export the function so it can be used in server.js
export default connectDB;

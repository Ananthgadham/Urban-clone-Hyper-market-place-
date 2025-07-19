// models/Service.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String, // e.g. "30 mins", "1 hour"
  },
  imageUrl: {
    type: String
  },
  location: {
    type: String, // e.g. "Urban Area", "Rural Area"
  }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
export default Service;

import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: String,
    address: String,
    location: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    experience: Number,
    skills: [String],
    services: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
    }]
  },
  { timestamps: true }
);

const ServiceProvider = mongoose.model('ServiceProvider', providerSchema);

export default ServiceProvider;


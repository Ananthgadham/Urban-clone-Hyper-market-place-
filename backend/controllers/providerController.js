import mongoose from 'mongoose';
import ServiceProvider from '../models/ServiceProvider.js';

export const createProvider = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      location,
      category,
      experience,
      skills,
      services
    } = req.body;

    if (!name || !email || !location || !category || services.length === 0) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existing = await ServiceProvider.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const objectIdServices = services.map(id => new mongoose.Types.ObjectId(id));

    const provider = new ServiceProvider({
      name,
      email,
      phone,
      address,
      location,
      category,
      experience,
      skills,
      services: objectIdServices
    });

    await provider.save();
    res.status(201).json(provider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProvidersByService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ message: 'Invalid service ID' });
    }

    const providers = await ServiceProvider.find({
      services: new mongoose.Types.ObjectId(serviceId)
    });

    res.json(providers);
  } catch (error) {
    console.error('Error fetching providers by service:', error);
    res.status(500).json({ message: error.message });
  }
};


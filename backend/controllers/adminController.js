// controllers/adminController.js
import User from '../models/User.js';
import ServiceProvider from '../models/ServiceProvider.js';
import Booking from '../models/Booking.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all service providers
export const getAllProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find();
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a provider and optionally their user account
export const deleteProvider = async (req, res) => {
  try {
    const provider = await ServiceProvider.findByIdAndDelete(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.status(200).json({ message: 'Provider deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('provider', 'name location')
      .populate('service', 'name price');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const providers = await ServiceProvider.countDocuments();
    const services = await Service.countDocuments();
    const bookings = await Booking.countDocuments();

    res.status(200).json({ users, providers, services, bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update booking status (from params)
export const updateBookingStatus = async (req, res) => {
  const { id, status } = req.params;
  const allowed = ['pending', 'completed', 'cancelled'];
  if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = status;
    await booking.save();
    res.status(200).json({ message: `Booking marked as ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

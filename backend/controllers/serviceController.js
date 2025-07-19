import Service from '../models/Service.js';
import fs from 'fs';
import path from 'path';
// Create new service (Admin only)
export const createService = async (req, res) => {
  try {
    const { name, description, category, price, duration,location } = req.body;

    const existing = await Service.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Service already exists' });
    }

    // Image URL from multer
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const service = new Service({
      name,
      description,
      category,
      price,
      duration,
      imageUrl,
      location: location || "", // Optional location field  
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update service by ID


export const editservice = async (req, res) => {
  try {
    const { id } = req.params;

    const existingService = await Service.findById(id);
    if (!existingService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Update fields from body
    const { name, description, price, category, duration } = req.body;
    if (name) existingService.name = name;
    if (description) existingService.description = description;
    if (price) existingService.price = price;
    if (category) existingService.category = category;
    if (duration) existingService.duration = duration;

    // Update image if uploaded
    if (req.file) {
      // Optionally delete the old image file from disk (optional cleanup)
      if (existingService.imageUrl) {
        const oldPath = path.join('uploads', existingService.imageUrl.split('/').pop());
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // Save new image URL
      existingService.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await existingService.save();
    res.json(updated);
  } catch (error) {
    console.error('Edit service error:', error.message);
    res.status(500).json({ message: 'Something went wrong while updating the service' });
  }
};


// controllers/serviceController.js


// Get single service by ID

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error.message);
    res.status(500).json({ message: error.message });
  }
};


export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Delete the image file if it exists
    if (service.imageUrl) {
      const imagePath = path.join('uploads', service.imageUrl.replace('/uploads/', ''));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({ message: error.message });
  }
};


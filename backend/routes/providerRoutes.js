import express from 'express';
import {
  getProvidersByService
} from '../controllers/providerController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

// Create new provider
router.get('/by-service/:serviceId', getProvidersByService); // Get providers by service

export default router;
// routes/serviceRoutes.js
import express from 'express';
import {
  createService,
  getAllServices,
  getServiceById
} from '../controllers/serviceController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Admin adds a new service with image upload
router.post(
  '/add',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
  createService
);

// Public routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);



export default router;

// routes/adminRoutes.js
import express from 'express';
import {
  getAllUsers,
  deleteUser,
  getAllProviders,
  deleteProvider,
  getAllBookings,
  updateBookingStatus,
} from '../controllers/adminController.js';
import { createProvider } from '../controllers/providerController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { editservice } from '../controllers/serviceController.js';
import { deleteService } from '../controllers/serviceController.js';
import {upload} from '../middleware/uploadMiddleware.js'; // your multer config
import { deleteReviewByAdmin } from '../controllers/reviewController.js';
const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

router.get('/providers', getAllProviders);
router.delete('/providers/:id', deleteProvider);

router.get('/bookings', getAllBookings);
router.patch('/bookings/:id/status', updateBookingStatus);
// Admin edits a service (you can also support image update here later)
router.put('/edit/:id',upload.single('image'), editservice);

// Delete service (admin only)
router.delete('/delete/:id',deleteService);
router.post('/add',createProvider); 
// DELETE review by ID (admin only)
router.delete('/delete-review/:id',deleteReviewByAdmin);

export default router;

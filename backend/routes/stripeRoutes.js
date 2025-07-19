import express from 'express';
import { createPaymentIntent } from '../controllers/stripeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/create-payment-intent', authMiddleware, createPaymentIntent);

export default router;

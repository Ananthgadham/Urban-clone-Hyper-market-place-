import express from "express";
import { createReview } from "../controllers/reviewController.js";
import  authMiddleware  from "../middleware/authMiddleware.js";
import { getAllReviews } from "../controllers/reviewController.js";
const router = express.Router();

router.post("/:bookingId",authMiddleware, createReview);
router.get("/", getAllReviews); 
export default router;

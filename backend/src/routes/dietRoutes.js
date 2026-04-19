import express from 'express';
import { getMeals, createMeal } from '../controllers/dietController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getMeals)
  .post(protect, createMeal);

export default router;

import express from 'express';
import { getWorkouts, createWorkout } from '../controllers/workoutController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getWorkouts)
  .post(protect, createWorkout);

export default router;

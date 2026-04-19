import express from 'express';
import { authUser, registerUser, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.route('/profile').put(protect, updateUserProfile);

export default router;

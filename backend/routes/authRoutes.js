import { Router } from 'express';
import { register, login, getUser } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticate, getUser);

export default router;
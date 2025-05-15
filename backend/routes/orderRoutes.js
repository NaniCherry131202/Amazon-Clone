import { Router } from 'express';
import { checkout } from '../controllers/orderController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authenticate, checkout);

export default router;
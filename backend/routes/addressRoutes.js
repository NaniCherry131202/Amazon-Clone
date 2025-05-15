import { Router } from 'express';
import { addAddress } from '../controllers/addressController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authenticate, addAddress);

export default router;
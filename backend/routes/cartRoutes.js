import { Router } from 'express';
import { addToCart, getCart ,updateCartItemQuantity} from '../controllers/cartController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authenticate, addToCart);
router.get('/', authenticate, getCart);
router.put('/', authenticate, updateCartItemQuantity);

export default router;
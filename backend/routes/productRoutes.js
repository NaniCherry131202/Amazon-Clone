import { Router } from 'express';
import { getProducts, addProduct } from '../controllers/productController.js';
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getProducts);
router.post('/', authenticate, isAdmin, addProduct);

export default router;
import { Router } from 'express';
import authRoutes from './authRoutes.js'; // Ditambahkan .js
import todoRoutes from './todoRoutes.js'; // Ditambahkan .js
import { verifyToken } from '../middlewares/authMiddleware.js'; // Ditambahkan .js

const router = Router();

router.use('/auth', authRoutes);
router.use('/todos', verifyToken, todoRoutes);

export default router;

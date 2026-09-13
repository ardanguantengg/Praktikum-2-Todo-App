import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { getTodos, createTodo } from '../controllers/todoController.js';
import { validateRegister, validateLogin, validateTodo } from '../middlewares/validator.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Endpoint Publik (Authentication)
router.post('/auth/register', validateRegister, register);
router.post('/auth/login', validateLogin, login);

// Endpoint Terproteksi (Harus pakai Token JWT)
router.get('/todos', verifyToken, getTodos);
router.post('/todos', verifyToken, validateTodo, createTodo);

export default router;

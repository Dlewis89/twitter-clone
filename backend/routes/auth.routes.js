import express from 'express';
import { protectedRoute } from '../middleware/protectedRoute.js';
import { register, login, logout, getUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/user', protectedRoute, getUser);

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

export default router;
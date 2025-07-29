import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Only for initial setup: register admin. Can be disabled after first use.
router.post('/register', register);
router.post('/login', login);

export default router;

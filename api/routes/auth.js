import express from 'express';
import {
	forgotPassword,
	login,
	register,
	resetPassword,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.post('/resetPassword', resetPassword);
export default router;

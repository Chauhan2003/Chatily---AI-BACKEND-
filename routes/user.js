import express from 'express';
import { loginUser, logoutUser, registerUser, validCookieCheckLogin } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/userValid.js';
const router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/logout').get(isAuthenticated, logoutUser);
router.route('/').get(isAuthenticated, validCookieCheckLogin);

export default router;
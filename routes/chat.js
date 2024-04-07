import express from 'express';
import { accessChat, createChat, deleteChat, getChat } from '../controllers/chat.js';
import { isAuthenticated } from '../middlewares/userValid.js';
const router = express.Router();

router.route('/create').post(isAuthenticated, createChat);
router.route('/getall').get(isAuthenticated, getChat);
router.route('/delete/:id').delete(isAuthenticated, deleteChat);
router.route('/accesschat/:id').get(isAuthenticated, accessChat);

export default router;
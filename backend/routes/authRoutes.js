import express from 'express';
const router = express.Router();
import { userLogin, updateInterests, getUserBlogs, userRegistration } from '../controllers/userController.js';

router.post('/user-registration', userRegistration);
router.post('/user-login', userLogin);
router.put('/update-interests/:id/interests', updateInterests);
router.get('/get-user-blogs/:userId', getUserBlogs);

export default router;

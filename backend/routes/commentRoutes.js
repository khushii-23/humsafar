import express from 'express';
import { postComment, getComments } from '../controllers/commentController.js';

const router = express.Router();

// Routes
router.post('/post-comment', postComment);
router.get('/get-comments/:blogId', getComments);

export default router;

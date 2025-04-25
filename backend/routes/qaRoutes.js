import express from 'express';
import { answerQuestion, answerQuestionTop } from '../controllers/qaControllers.js';

const router = express.Router();

router.post('/answer', answerQuestion);
router.post('/answerTop', answerQuestionTop);

export default router;

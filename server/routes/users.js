import express from 'express';

import { signin, signup, getAllUser } from '../controllers/user.js';

const router = express.Router();

router.get('/', getAllUser);
router.post('/signin', signin);
router.post('/signup', signup);

export default router;

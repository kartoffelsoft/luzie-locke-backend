import express from 'express';

import auth from '../middleware/auth.js';
import { makeExpressCallback } from '../express-callback/index.js';

import usersControllers from '../controllers/users-controllers.js';

const router = express.Router()

router.get('/:id', usersControllers.getUserProfile);

router.post('/login/google', usersControllers.loginGoogle);
router.post('/login/refresh', usersControllers.refreshAccessToken);

router.patch('/location', auth, usersControllers.updateLocation);

export default router;

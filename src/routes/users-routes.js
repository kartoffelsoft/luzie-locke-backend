import express from 'express';

import auth from '../middleware/auth.js';
import usersControllers from '../controllers/users-controllers.js';

import userController from '../controllers/user/index.js'
import { makeExpressCallback } from '../express-callback/index.js';

const router = express.Router()

router.get('/:id', makeExpressCallback(userController.getUser));

router.post('/login/google', usersControllers.loginGoogle);
router.post('/login/refresh', usersControllers.refreshAccessToken);

router.patch('/location', auth, usersControllers.updateLocation);

export default router;

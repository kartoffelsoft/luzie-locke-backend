const express = require('express');

const auth = require('../middleware/auth.js');
const usersControllers = require('../controllers/users-controllers.js');

const userController = require('../controllers/user');
const locationController = require('../controllers/user');
const { makeExpressCallback } = require('../utils/express-callback');

const router = express.Router()

router.get('/:id', makeExpressCallback(userController.getUser));

// router.post('/login/google', usersControllers.loginGoogle);
router.post('/login/refresh', usersControllers.refreshAccessToken);

router.patch('/location', auth, makeExpressCallback(locationController.patchLocation));

module.exports = router;

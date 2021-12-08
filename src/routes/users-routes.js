const express = require('express')

const auth = require('../middleware/auth.js')
const usersControllers = require('../controllers/users-controllers.js')

const userController = require('../controllers/user')
const locationController = require('../controllers/location')
const settingsController = require('../controllers/settings')

const { makeExpressCallback } = require('../utils/express-callback')

const router = express.Router()

router.get('/:id', makeExpressCallback(userController.getUser));
router.get('/self/settings/local-level', auth, makeExpressCallback(settingsController.getLocalLevel));
router.get('/self/settings/location', auth, makeExpressCallback(settingsController.getLocation));

router.post('/login/refresh', usersControllers.refreshAccessToken);

router.patch('/self/settings/local-level', auth, makeExpressCallback(settingsController.patchLocalLevel));
router.patch('/self/settings/location', auth, makeExpressCallback(locationController.patchLocation));

module.exports = router;

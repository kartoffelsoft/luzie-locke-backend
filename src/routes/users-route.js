const express = require('express')

const usersControllers = require('../controllers/users-controllers.js')
const userController = require('../controllers/user')

const { makeExpressCallback } = require('../utils/express-callback')

const router = express.Router()

router.get('/:id', makeExpressCallback(userController.getUser));
router.get('/:id/image', makeExpressCallback(userController.getUserImage))

router.post('/login/refresh', usersControllers.refreshAccessToken);

module.exports = router;

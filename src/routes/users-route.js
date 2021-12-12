const express = require('express')
const auth = require('../middleware/auth.js')

const usersControllers = require('../controllers/users-controllers.js')
const userController = require('../controllers/user')
const userItemController = require('../controllers/user-item')

const { makeExpressCallback } = require('../utils/express-callback')

const router = express.Router()

router.get('/:id', makeExpressCallback(userController.getUser))
router.get('/:id/image', makeExpressCallback(userController.getUserImage))

router.post('/login/refresh', usersControllers.refreshAccessToken)

router.get('/:id/items', auth, makeExpressCallback(userItemController.getUserItemOpenList))
router.get('/:id/items/sold', auth, makeExpressCallback(userItemController.getUserItemSoldList))
router.get('/:id/items/bought', auth, makeExpressCallback(userItemController.getUserItemBoughtList))

module.exports = router;

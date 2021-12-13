const express = require('express')
const auth = require('../middleware/auth.js')

const usersControllers = require('../controllers/users-controllers.js')
const userController = require('../controllers/user')
const userItemController = require('../controllers/user-item')
const favoriteItemController = require('../controllers/favorite-item')

const { makeExpressCallback } = require('../utils/express-callback')

const router = express.Router()

router.get('/:id', makeExpressCallback(userController.getUser))
router.get('/:id/image', makeExpressCallback(userController.getUserImage))

router.post('/login/refresh', usersControllers.refreshAccessToken)

router.get('/:id/open-items', auth, makeExpressCallback(userItemController.getUserItemOpenList))
router.get('/:id/sold-items', auth, makeExpressCallback(userItemController.getUserItemSoldList))
router.get('/:id/bought-items', auth, makeExpressCallback(userItemController.getUserItemBoughtList))

router.get('/:id/favorite-items', auth, makeExpressCallback(favoriteItemController.getFavoriteItemList)) 
router.get('/:id1/favorite-items/:id2', auth, makeExpressCallback(favoriteItemController.getFavoriteItem)) 
router.post('/:id/favorite-items', auth, makeExpressCallback(favoriteItemController.postFavoriteItem)) 
router.delete('/:id1/favorite-items/:id2', auth, makeExpressCallback(favoriteItemController.deleteFavoriteItem))

module.exports = router

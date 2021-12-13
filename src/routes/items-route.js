const express = require('express')

const auth = require('../middleware/auth.js')
const itemsControllers = require('../controllers/items-controllers.js')

const itemController = require('../controllers/item')
const searchController = require('../controllers/search')
const favoriteItemController = require('../controllers/favorite-item')
const { makeExpressCallback } = require('../utils/express-callback')

const router = express.Router()

router.get('/', auth, makeExpressCallback(itemController.getItemList))
router.get('/search', auth, makeExpressCallback(searchController.getSearchList))

router.get('/hot', itemsControllers.getHotItems) // 
router.get('/garage/', auth, itemsControllers.getGarageItems) // 
router.get('/:id', makeExpressCallback(itemController.getItem))
router.get('/:id/image', makeExpressCallback(itemController.getItemImage))
router.get('/:id/trade-state', makeExpressCallback(itemController.getItemTradeState))

router.post('/', auth, makeExpressCallback(itemController.postItem))

router.patch('/:id', auth, makeExpressCallback(itemController.patchItem)) 
router.patch('/:id/like', auth, itemsControllers.updateLike) //
router.patch('/:id/trade-state', makeExpressCallback(itemController.patchItemTradeState))

router.delete('/:id', auth, makeExpressCallback(itemController.deleteItem)) 

module.exports = router

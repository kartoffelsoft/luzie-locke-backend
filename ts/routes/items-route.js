const express = require('express')

const auth = require('../middleware/auth.js')

const itemController = require('../controllers/item')
const searchController = require('../controllers/search')
const { makeExpressCallback } = require('../utils/express-callback')

const router = express.Router()

router.get('/', auth, makeExpressCallback(itemController.getItemList))
router.get('/search', auth, makeExpressCallback(searchController.getSearchList))

router.get('/:id', makeExpressCallback(itemController.getItem))
router.get('/:id/image', makeExpressCallback(itemController.getItemImage))

router.post('/', auth, makeExpressCallback(itemController.postItem))

router.patch('/:id', auth, makeExpressCallback(itemController.patchItem)) 
router.patch('/:id/trade-state', makeExpressCallback(itemController.patchItemTradeState))

router.delete('/:id', auth, makeExpressCallback(itemController.deleteItem)) 

module.exports = router

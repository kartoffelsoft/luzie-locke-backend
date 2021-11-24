const express = require('express');

const auth = require('../middleware/auth.js');
const itemsControllers = require('../controllers/items-controllers.js');

const itemController = require('../controllers/item');
const userItemController = require('../controllers/user-item');
const searchController = require('../controllers/search');
const { makeExpressCallback } = require('../utils/express-callback');

const router = express.Router();

router.get('/', auth, makeExpressCallback(itemController.getItemList));
router.get('/search', auth, makeExpressCallback(searchController.getSearchList));
router.get('/user', auth, makeExpressCallback(userItemController.getUserItemList));
router.get('/user/sold', auth, makeExpressCallback(userItemController.getUserItemSoldList));
router.get('/user/bought', auth, makeExpressCallback(userItemController.getUserItemBoughtList));

router.get('/hot', itemsControllers.getHotItems);
router.get('/garage/', auth, itemsControllers.getGarageItems);
router.get('/:id', makeExpressCallback(itemController.getItem));

router.post('/', auth, makeExpressCallback(itemController.postItem));

router.patch('/:id', auth, itemsControllers.updateItem);
router.patch('/:id/like', auth, itemsControllers.updateLike);

router.delete('/:id', auth, itemsControllers.deleteItem);

module.exports = router;

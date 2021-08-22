const express = require('express');

const auth = require("../middleware/auth.js");
const itemsControllers = require('../controllers/items-controllers')

const router = express.Router();

router.get('/', itemsControllers.getItems);
router.get('/hot', itemsControllers.getHotItems);
router.get('/garage/', auth, itemsControllers.getGarageItems);
router.get('/:id', itemsControllers.getItem);

router.post('/', auth, itemsControllers.createItem);

router.patch('/:id', auth, itemsControllers.updateItem);
router.patch('/:id/like', auth, itemsControllers.updateLike);

router.delete('/:id', auth, itemsControllers.deleteItem);

module.exports = router;

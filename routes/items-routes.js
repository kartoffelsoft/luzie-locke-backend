const express = require('express');

const auth = require("../middleware/auth.js");
const itemsControllers = require('../controllers/items-controllers')

const router = express.Router();

router.get('/', itemsControllers.getAllItems);
router.get('/my/', auth, itemsControllers.getMyItems);
router.get('/:id', itemsControllers.getItem);

router.post('/', auth, itemsControllers.createItem);

router.patch('/:id', auth, itemsControllers.updateItem);
router.patch('/:id/like', auth, itemsControllers.updateLike);

router.delete('/:id', auth, itemsControllers.deleteItem);

module.exports = router;

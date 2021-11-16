import express from 'express';

import auth from '../middleware/auth.js'
import itemsControllers from '../controllers/items-controllers.js'

const router = express.Router();

router.get('/', itemsControllers.getRecentItems);
router.get('/hot', itemsControllers.getHotItems);
router.get('/garage/', auth, itemsControllers.getGarageItems);
router.get('/:id', itemsControllers.getItem);

router.post('/', auth, itemsControllers.createItem);

router.patch('/:id', auth, itemsControllers.updateItem);
router.patch('/:id/like', auth, itemsControllers.updateLike);

router.delete('/:id', auth, itemsControllers.deleteItem);

export default router;

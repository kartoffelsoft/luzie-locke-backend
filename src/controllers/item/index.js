const itemUseCases = require('../../usecases/item')

const makeGetItem             = require('./get-item.js')
const makeGetItemList         = require('./get-item-list.js')
const makeGetItemImage        = require('./get-item-image.js')
const makePostItem            = require('./post-item.js')
const makePatchItem           = require('./patch-item.js')
const makePatchItemTradeState = require('./patch-item-trade-state.js')
const makeDeleteItem          = require('./delete-item.js')

const getItem                 = makeGetItem({ readItem: itemUseCases.readItem })
const getItemList             = makeGetItemList({ readItemList: itemUseCases.readItemList })
const getItemImage            = makeGetItemImage({ readItem: itemUseCases.readItem })

const postItem                = makePostItem({ createItem: itemUseCases.createItem })
const patchItem               = makePatchItem({ updateItem: itemUseCases.updateItem })
const patchItemTradeState     = makePatchItemTradeState({ updateItem: itemUseCases.updateItem })
const deleteItem              = makeDeleteItem({ deleteItem: itemUseCases.deleteItem })

module.exports = Object.freeze({
  getItem,
  getItemList,
  getItemImage,
  postItem,
  patchItem,
  patchItemTradeState,
  deleteItem
})

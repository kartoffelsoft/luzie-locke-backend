const itemUseCases = require('../../usecases/item')
const itemDoneUseCases = require('../../usecases/item-done')

const makeUserItemList        = require('./get-user-item-list.js')
const makeUserItemSoldList    = require('./get-user-item-sold-list.js')
const makeUserItemBoughtList  = require('./get-user-item-bought-list.js')

const getUserItemList         = makeUserItemList({ readItemListByUser: itemUseCases.readItemListByUser })
const getUserItemSoldList     = makeUserItemSoldList({ readItemDoneListByUser: itemDoneUseCases.readItemListByUser })
const getUserItemBoughtList   = makeUserItemBoughtList({ readItemDoneListByBuyer: itemDoneUseCases.readItemListByBuyer })

module.exports = Object.freeze({
  getUserItemList,
  getUserItemSoldList,
  getUserItemBoughtList
})

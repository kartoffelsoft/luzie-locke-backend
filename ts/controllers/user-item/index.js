const userItemUseCases = require('../../usecases/user-item')

const makeGetUserItemOpenList    = require('./get-user-item-open-list.js')
const makeGetUserItemSoldList    = require('./get-user-item-sold-list.js')
const makeGetUserItemBoughtList  = require('./get-user-item-bought-list.js')

const getUserItemOpenList     = makeGetUserItemOpenList({ readOpenItemList: userItemUseCases.readOpenItemList })
const getUserItemSoldList     = makeGetUserItemSoldList({ readSoldItemList: userItemUseCases.readSoldItemList })
const getUserItemBoughtList   = makeGetUserItemBoughtList({ readBoughtItemList: userItemUseCases.readBoughtItemList })

module.exports = Object.freeze({
  getUserItemOpenList,
  getUserItemSoldList,
  getUserItemBoughtList
})

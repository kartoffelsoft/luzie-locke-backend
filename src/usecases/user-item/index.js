const makeReadOpenItemList    = require('./read-open-item-list.js')
const makeReadSoldItemList    = require('./read-sold-item-list.js')
const makeReadBoughtItemList  = require('./read-bought-item-list.js')

const { itemsDatabase }   = require('../../database-access')

const readOpenItemList        = makeReadOpenItemList({ itemsDatabase })
const readSoldItemList        = makeReadSoldItemList({ itemsDatabase })
const readBoughtItemList      = makeReadBoughtItemList({ itemsDatabase })

module.exports = Object.freeze({
  readOpenItemList,
  readSoldItemList,
  readBoughtItemList
})

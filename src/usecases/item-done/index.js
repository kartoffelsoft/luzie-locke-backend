const makeReadItemListByUser  = require('./read-item-list-by-user.js')
const makeReadItemListByBuyer = require('./read-item-list-by-buyer.js')

const { itemsDoneDatabase }   = require('../../database-access')

const readItemListByUser      = makeReadItemListByUser({ itemsDoneDatabase })
const readItemListByBuyer     = makeReadItemListByBuyer({ itemsDoneDatabase })

module.exports = Object.freeze({
  readItemListByUser,
  readItemListByBuyer
})

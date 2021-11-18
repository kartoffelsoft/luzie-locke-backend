const makeReadItem = require('./read-item.js')

const { itemsDatabase } = require('../../database-access')

const readItem = makeReadItem({ itemsDatabase })

module.exports = Object.freeze({
  readItem
})

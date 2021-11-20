const makeCreateItem = require('./create-item.js')
const makeReadItem = require('./read-item.js')

const { usersDatabase, itemsDatabase } = require('../../database-access')
const { makeItem } = require('../../database-model')

const createItem = makeCreateItem({ usersDatabase, itemsDatabase, makeItem })
const readItem = makeReadItem({ itemsDatabase })

module.exports = Object.freeze({
  createItem,
  readItem
})

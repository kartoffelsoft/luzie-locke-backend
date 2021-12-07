const makeReadSearchList = require('./read-search-list.js')
const localLevelMapper    = require('../../utils/local-level-mapper')

const { itemsDatabase } = require('../../database-access')

const { readUser } = require('../user')

const readSearchList = makeReadSearchList({ itemsDatabase, readUser, localLevelMapper })

module.exports = Object.freeze({
  readSearchList
})

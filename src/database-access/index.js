const makeDatabase = require('../database')
const makeUsersDatabase = require('./users-database.js')
const makeItemsDatabase = require('./items-database.js')

let usersDatabase = makeUsersDatabase({ makeDatabase });
let itemsDatabase = makeItemsDatabase({ makeDatabase });

module.exports = Object.freeze({
  usersDatabase,
  itemsDatabase
})

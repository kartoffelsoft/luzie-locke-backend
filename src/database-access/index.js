
import makeDatabase from '../database/index.js'
import makeUsersDatabase from './users-database.js'
import makeItemsDatabase from './items-database.js'

let usersDatabase = makeUsersDatabase({ makeDatabase })
let itemsDatabase = makeItemsDatabase({ makeDatabase })


export {
  usersDatabase,
  itemsDatabase
}
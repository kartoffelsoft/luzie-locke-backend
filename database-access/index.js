
import makeDatabase from '../database/index.js'
import makeUsersDatabase from './users-database.js'

let usersDatabase = makeUsersDatabase({ makeDatabase })

export {
  usersDatabase
}
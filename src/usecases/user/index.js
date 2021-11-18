const makeReadUser = require('./read-user.js')

const { usersDatabase } = require('../../database-access')

const readUser = makeReadUser({ usersDatabase })

module.exports = Object.freeze({
  readUser
})

const makeUpdateLocalLevel = require('./update-local-level.js');

const { usersDatabase } = require('../../database-access');
const { makeUser } = require('../../database-model');

const updateLocalLevel = makeUpdateLocalLevel({ usersDatabase, makeUser })

module.exports = Object.freeze({
  updateLocalLevel
})

const makeUpdateLocalLevel = require('./update-local-level.js');
const makeUpdateLocation = require('./update-location.js');

const { usersDatabase } = require('../../database-access');
const { makeUser } = require('../../database-model');

const updateLocalLevel = makeUpdateLocalLevel({ usersDatabase, makeUser })
const updateLocation = makeUpdateLocation({ usersDatabase, makeUser })

module.exports = Object.freeze({
  updateLocalLevel,
  updateLocation
})

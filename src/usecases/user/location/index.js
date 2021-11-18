const makeUpdateLocation = require('./update-location.js');

const { usersDatabase } = require('../../../database-access');
const { makeUser } = require('../../../database-model');

const updateLocation = makeUpdateLocation({ usersDatabase, makeUser })

module.exports = Object.freeze({
  updateLocation
})

const userUseCases = require('../../usecases/user');
const makeGetUser = require('./get-user.js');

const getUser = makeGetUser({ readUser: userUseCases.readUser });
  
module.exports = Object.freeze({
  getUser
})

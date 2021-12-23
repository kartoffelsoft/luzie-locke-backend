const jwt = require('jsonwebtoken')

function make({ id, subId, expiresIn }) {
  return jwt.sign({ id, subId }, process.env.ACCESS_TOKEN_KEY, { expiresIn })
}

module.exports = Object.freeze({
  make: make
})

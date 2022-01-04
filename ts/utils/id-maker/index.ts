const cuid = require('cuid')

module.exports = Object.freeze({
  make: cuid,
  isValid: cuid.isCuid
})

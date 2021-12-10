const usersRoute    = require('./users-route.js')
const itemsRoute    = require('./items-route.js')
const authRoute     = require('./auth-route.js')
const settingsRoute = require('./settings-route.js')
const imagesRoute   = require('./images-route.js')

module.exports = Object.freeze({ 
  usersRoute, 
  itemsRoute, 
  authRoute,
  settingsRoute,
  imagesRoute
});

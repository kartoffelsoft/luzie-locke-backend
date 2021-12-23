const authUseCases = require('../../usecases/auth')

const makePostAuth = require('./post-auth.js')

const postAuth = makePostAuth({ 
  authGoogle: authUseCases.authGoogle, 
  issueAccessToken: authUseCases.issueAccessToken, 
  issueRefreshToken: authUseCases.issueRefreshToken 
})
  
module.exports = Object.freeze({
  postAuth,
})

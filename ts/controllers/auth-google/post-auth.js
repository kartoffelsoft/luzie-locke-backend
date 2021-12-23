module.exports = function makePostAuth({ authGoogle, issueAccessToken, issueRefreshToken }) {
  return async function postAuth(httpRequest) {
    try {
      const user = await authGoogle({ 
        uid: httpRequest.body.id, 
        token: httpRequest.body.token 
      })

      let accessToken = await issueAccessToken({ id: user.id, subId: user.subId })
      let refreshToken = await issueRefreshToken({ id: user.id, subId: user.subId })

      return {
        statusCode: 200,
        body: {
          success: true,
          message: '',
          data: { user, accessToken, refreshToken }
        }
      }
    } catch(error) {
      console.log(error.message)
      return {
        statusCode: 400,
        body: {
          success: false,
          message: error.message,
          data: null
        }
      }
    }
  }
}
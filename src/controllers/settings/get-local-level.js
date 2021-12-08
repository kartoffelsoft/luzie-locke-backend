module.exports = function makeGetLocalLevel({ readUser }) {
  return async (httpRequest) => {
    try {
      const user = await readUser({ uid: httpRequest.uid })

      return {
        statusCode: 200,
        body: {
          success: true,
          message: '',
          data: { localLevel: user.localLevel }
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

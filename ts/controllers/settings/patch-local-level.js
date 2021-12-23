module.exports = function makePatchLocalLevel({ updateLocalLevel }) {
  return async (httpRequest) => {
    try {
      await updateLocalLevel({ 
        uid: httpRequest.uid,
        data: { localLevel: httpRequest.body.localLevel }
      })

      return {
        statusCode: 200,
        body: {
          success: true,
          message: '',
          data: null
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

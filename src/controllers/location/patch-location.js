module.exports = function makePatchLocation({ updateLocation }) {
  return async function patchLocation(httpRequest) {
    try {
      const user = await updateLocation({ 
        uid: httpRequest.uid,
        city: httpRequest.body.city,
        lng: httpRequest.body.lng,
        lat: httpRequest.body.lat
      })

      return {
        statusCode: 200,
        body: {
          success: true,
          message: '',
          data: { user }
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

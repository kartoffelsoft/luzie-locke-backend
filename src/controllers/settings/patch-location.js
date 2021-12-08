module.exports = function makePatchLocation({ updateLocation }) {
  return async (httpRequest) => {
    try {
      const user = await updateLocation({ 
        uid: httpRequest.uid,
        data: { 
          city: httpRequest.body.city,
          location: {
            type: 'Point',
            coordinates: [httpRequest.body.lng, httpRequest.body.lat]
          }
        }
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

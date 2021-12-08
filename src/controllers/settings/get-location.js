module.exports = function makeGetLocation({ readUser }) {
  return async (httpRequest) => {
    try {
      const user = await readUser({ uid: httpRequest.uid })

      return {
        statusCode: 200,
        body: {
          success: true,
          message: '',
          data: { city: user.city, lng: user.location.coordinates[0], lat: user.location.coordinates[1] }
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

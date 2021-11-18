export default function makePatchLocation({ updateLocation }) {
  return async function patchLocation(httpRequest) {
    try {
      const user = await updateLocation({ 
        id: httpRequest.params.id,
        name: httpRequest.body.name,
        lat: httpRequest.body.lat,
        lng: httpRequest.body.lng,
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

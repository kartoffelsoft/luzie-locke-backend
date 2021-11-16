export default function makeGetUser({ readUser }) {
  return async function getUser(httpRequest) {
    try {
      const user = await readUser({ id: httpRequest.params.id })
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
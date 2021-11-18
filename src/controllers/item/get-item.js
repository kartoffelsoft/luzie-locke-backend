module.exports = function makeGetItem({ readItem }) {
  return async function getItem(httpRequest) {
    try {
      const item = await readItem({ id: httpRequest.params.id })
      return {
        statusCode: 200,
        body: {
          success: true,
          message: '',
          data: { item }
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
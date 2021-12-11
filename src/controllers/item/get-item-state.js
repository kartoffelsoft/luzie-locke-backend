module.exports = function makeGetItemState({ readItem }) {
  return async (httpRequest) => {
    try {
      const item = await readItem({ id: httpRequest.params.id })
      return {
        statusCode: 200,
        body: {
          success: true,
          message: '',
          data: { state: item.state }
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
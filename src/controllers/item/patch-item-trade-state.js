module.exports = function makePatchItemTradeState({ updateItem }) {
  return async (httpRequest) => {
    try {
      const modifiedCount = await updateItem({ 
        id: httpRequest.params.id,
        ...httpRequest.body
      })

      return {
        statusCode: modifiedCount == 1 ? 204 : 201,
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
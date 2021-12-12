module.exports = function makePatchItemTradeState({ updateItemTradeState }) {
  return async (httpRequest) => {
    try {
      const item = await updateItemTradeState({ 
        id: httpRequest.params.id,
        state: httpRequest.body.state, 
        buyer: httpRequest.body.buyerId })

      return {
        statusCode: item == null ? 204 : 201,
        body: {
          success: true,
          message: '',
          data: { state: item.state, sellerId: item.user.id, buyerId: item.buyer }
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
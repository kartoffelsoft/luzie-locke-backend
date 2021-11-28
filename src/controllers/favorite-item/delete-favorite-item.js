module.exports = function makeDeleteFavoriteItem({ deleteFavoriteItem }) {
  return async function makeDeleteFavoriteItem(httpRequest) {
    try {
      const list = await deleteFavoriteItem({ 
        user: httpRequest.uid, 
        item: httpRequest.params.id
      })
      
      return {
        statusCode: 200,
        body: {
          success: true,
          message: '',
          data: { list, nextCursor: nextCursor }
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

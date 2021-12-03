module.exports = function makeDeleteFavoriteItem({ deleteFavoriteItem }) {
  return async (httpRequest) => {
    try {
      const deletedCount = await deleteFavoriteItem({ 
        user: httpRequest.uid, 
        item: httpRequest.params.id
      })
      
      return {
        statusCode: deletedCount == 0 ? 204 : 202,
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

module.exports = function makePostFavoriteItemList({ createFavoriteItem }) {
  return async function postFavoriteItem(httpRequest) {
    try {
      const list = await createFavoriteItem({ 
        user: httpRequest.uid, 
        item: httpRequest.body.itemId
      })
      
      return {
        statusCode: 200,
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

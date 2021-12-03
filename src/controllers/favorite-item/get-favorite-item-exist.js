module.exports = function makeGetFavoriteItemExist({ readFavoriteItemExist }) {
  return async function getFavoriteItemExist(httpRequest) {
    try {
      const exist = await readFavoriteItemExist({ 
        user: httpRequest.uid, 
        item: httpRequest.params.id
      })

      return {
        statusCode: 200,
        body: {
          success: true,
          message: '',
          data: { exist }
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

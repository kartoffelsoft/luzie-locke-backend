module.exports = function makeGetFavoriteItem({ readFavoriteItem }) {
  return async (httpRequest) => {
    try {
      const favorite = await readFavoriteItem({ 
        user: httpRequest.params.id1, 
        item: httpRequest.params.id2
      })

      return {
        statusCode: 200,
        body: {
          success: true,
          message: '',
          data: { favorite }
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

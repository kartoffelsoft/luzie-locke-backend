module.exports = function makePostItem({ createItem }) {
  return async function postItem(httpRequest) {
    try {
      await createItem({ 
        uid: httpRequest.uid,
        title: httpRequest.body.title, 
        price: httpRequest.body.price, 
        description: httpRequest.body.description, 
        imageUrls: httpRequest.body.imageUrls })

      return {
        statusCode: 201,
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
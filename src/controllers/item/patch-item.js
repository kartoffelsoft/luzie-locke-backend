module.exports = function makePatchItem({ updateItem }) {
  return async function patchItem(httpRequest) {
    // try {
    //   const modifiedCount = await updateItem({ 
    //     id: httpRequest.params.id,
    //     title: httpRequest.body.title, 
    //     price: httpRequest.body.price, 
    //     description: httpRequest.body.description, 
    //     imageUrls: httpRequest.body.imageUrls })
    
      try {
        const modifiedCount = await updateItem({ 
          id: httpRequest.params.id,
          ...httpRequest.body
        })

      return {
        statusCode: modifiedCount == 1 ? 201 : 204,
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
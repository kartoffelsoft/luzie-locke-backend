module.exports = function makeGetItemList({ readItemList }) {
  return async function getItemList(httpRequest) {
    try {
      const itemList = await readItemList({ uid: httpRequest.uid })
      return {
        statusCode: 200,
        body: {
          success: true,
          message: '',
          data: { itemList }
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
module.exports = function makeGetItemList({ readItemList }) {
  return async function getItemList(httpRequest) {
    let cursor = parseFloat(httpRequest.query.cursor)
    let limit = parseInt(httpRequest.query.limit)

    try {
      const list = await readItemList({ 
        uid: httpRequest.uid, 
        cursor: cursor, 
        limit: limit
      })
      
      let nextCursor = list.length == limit ? list[list.length - 1].modifiedAt : -1

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
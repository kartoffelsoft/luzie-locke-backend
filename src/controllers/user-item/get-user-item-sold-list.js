module.exports = function makeGetUserItemSoldList({ readSoldItemList }) {
  return async (httpRequest) => {
    let cursor = parseFloat(httpRequest.query.cursor)
    let limit = parseInt(httpRequest.query.limit)
    
    try {
      const list = await readSoldItemList({ 
        uid: httpRequest.params.id, 
        cursor: cursor, 
        limit: limit
      })
      
      let nextCursor = list.length == limit ? list[list.length - 1].modifiedAt : -1

      console.log(list)
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
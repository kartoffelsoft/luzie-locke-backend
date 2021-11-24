module.exports = function makeGetUserItemBoughtList({ readItemDoneListByBuyer }) {
  return async function getUserItemBoughtList(httpRequest) {
    let cursor = parseFloat(httpRequest.query.cursor)
    let limit = parseInt(httpRequest.query.limit)

    try {
      const list = await readItemDoneListByBuyer({ 
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
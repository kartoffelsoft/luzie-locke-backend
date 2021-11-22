module.exports = function makeGetSearchList({ readSearchList }) {
  return async function getSearchList(httpRequest) {
    let q = httpRequest.query.q
    let cursor = parseFloat(httpRequest.query.cursor)
    let limit = parseInt(httpRequest.query.limit)

    try {
      const list = await readSearchList({
        keyword: q,
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

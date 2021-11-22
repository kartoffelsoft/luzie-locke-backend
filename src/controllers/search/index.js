const searchUseCases = require('../../usecases/search')

const makeGetSearchList = require('./get-search-list.js')

const getSearchList = makeGetSearchList({ readSearchList: searchUseCases.readSearchList })

module.exports = Object.freeze({
  getSearchList
})

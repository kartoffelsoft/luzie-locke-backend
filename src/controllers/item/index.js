import itemUseCases from '../../usecases/item/index.js'

import makeGetItem from './get-item.js'

const getItem = makeGetItem({ readItem: itemUseCases.readItem })
  
export default Object.freeze({
  getItem,
})

export { getItem }
  
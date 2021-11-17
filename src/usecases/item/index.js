import makeReadItem from './read-item.js'

import { itemsDatabase } from '../../database-access/index.js'

const readItem = makeReadItem({ itemsDatabase })

export default Object.freeze({
  readItem
})

export {
  readItem
}
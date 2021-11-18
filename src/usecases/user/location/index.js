import makeUpdateLocation from './update-location.js'

import { usersDatabase } from '../../../database-access/index.js'
import { makeUser } from '../../../database-model'

const updateLocation = makeUpdateLocation({ usersDatabase, makeUser })

export default Object.freeze({
  updateLocation
})

export {
  updateLocation
}
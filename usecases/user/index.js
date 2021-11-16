import makeReadUser from './read-user.js'

import { usersDatabase } from '../../database-access/index.js'

const readUser = makeReadUser({ usersDatabase })

export default Object.freeze({
  readUser
})

export {
  readUser
}
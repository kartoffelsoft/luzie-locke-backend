import userUseCases from '../../usecases/user/index.js'

import makeGetUser from './get-user.js'

const getUser = makeGetUser({ readUser: userUseCases.readUser })
  
export default Object.freeze({
  getUser
})

export { getUser }
  
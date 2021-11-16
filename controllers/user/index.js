import userUseCases from '../../usecases/user/index.js'

import makeGetUser from './get-user.js'

const getUser = makeGetUser({ readUser: userUseCases.readUser })
  
const userController = Object.freeze({
  getUser
})
  
export default userController
export { getUser }
  
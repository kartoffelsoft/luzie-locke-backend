import idMaker from '../utils/id-maker.js'
import buildMakeUser from './user.js'

const makeUser = buildMakeUser({ idMaker })

export default Object.freeze({
  makeUser
})

export {
  makeUser
}

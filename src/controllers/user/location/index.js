import userUseCases from '../../usecases/user/index.js'

import makePatchLocation from './patch-location.js'

const patchLocation = makePatchLocation({ updateLocation: locatiuonUseCases.updateLocation })
  
export default Object.freeze({
  patchLocation
})

export { patchLocation }

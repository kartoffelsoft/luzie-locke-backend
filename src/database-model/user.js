export default function buildMakeUser(idMaker) {
  return function ({
    id = idMaker.make(),
    subId,
    name,
    email,
    reputation = 0,
    imageUrl = '',
    proximity = 100,
    locationName = '',
    locationCoordinates = {
      type: 'Point', coordinates = [0, 0]
    }
  } = {}) {
    if (!idMaker.isValid(id)) {
      throw new Error('Invalid id.')
    }
    if (!subId) {
      throw new Error('User data must have an subId.')
    }
    if (!name) {
      throw new Error('User data must have a name.')
    }

    return Object.freeze({
      getId: () => id,
      getSubId: () => subId,
      getName: () => name,
      getEmail: () => email,
      getReputation: () => reputation,
      getImageUrl: () => imageUrl,
      getProximity: () => proximity,
      getLocationName: () => locationName,
      getLocationCoordinates: () => locationCoordinates
    })
  }
}

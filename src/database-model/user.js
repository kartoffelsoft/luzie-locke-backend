function buildMakeUser() {
  return function makeUser ({
    id,
    subId,
    name,
    email = '',
    reputation = 0,
    imageUrl = '',
    proximity = 100,
    city = '',
    location = {
      type: 'Point', coordinates: [0, 0]
    }
  } = {}) {
    if(!id) {
      throw new Error('User data must have an id.')
    }
    if(!subId) {
      throw new Error('User data must have an subId.')
    }
    if(!name) {
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
      getCity: () => city,
      getLocation: () => location
    })
  }
}

module.exports = buildMakeUser

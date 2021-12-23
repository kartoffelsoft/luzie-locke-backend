function buildMakeUser() {
  return function makeUser ({
    id,
    subId,
    name,
    email = '',
    reputation = 0,
    imageUrl = '',
    localLevel = 9,
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
    if(!(0 <= localLevel && localLevel <= 9)) {
      throw new Error('localLevel is out of range.')
    }

    return Object.freeze({
      getId: () => id,
      getSubId: () => subId,
      getName: () => name,
      getEmail: () => email,
      getReputation: () => reputation,
      getImageUrl: () => imageUrl,
      getLocalLevel: () => localLevel,
      getCity: () => city,
      getLocation: () => location
    })
  }
}

module.exports = buildMakeUser

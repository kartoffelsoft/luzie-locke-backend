function makeAuthGoogle({ googleAuthApi, usersDatabase, makeUser }) {
  return async function authGoogle({ id, token } = {}) {
    if(!token) {
      throw new Error('Missing mandatory parameters: token');
    }

    const data = await googleAuthApi.read({ token });

    if(!data) {
      throw new Error('Invalid token');
    }

    const user = await usersDatabase.findById({ id });

    if(!user) {
      const newUser = makeUser({
        id: id,
        subId: data.sub,
        name: data.given_name,
        email: data.email,
        imageUrl: data.picture
      });

      return await usersDatabase.insert({
        id: newUser.getId(),
        subId: newUser.getSubId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        reputation: newUser.getReputation(),
        imageUrl: newUser.getImageUrl(),
        proximity: newUser.getProximity(),
        locationName: newUser.getLocationName(),
        locationCoordinates: newUser.getLocationCoordinates()
      });
    }

    return user;
  }
}

module.exports = makeAuthGoogle
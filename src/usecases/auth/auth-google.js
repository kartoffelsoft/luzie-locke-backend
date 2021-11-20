function makeAuthGoogle({ googleAuthApi, usersDatabase, makeUser }) {
  return async function authGoogle({ uid, token } = {}) {
    if(!token) {
      throw new Error('Missing mandatory parameters: token');
    }

    const data = await googleAuthApi.read({ token });

    if(!data) {
      throw new Error('Invalid token');
    }

    const user = await usersDatabase.findById({ id: uid });

    if(!user) {
      const newUser = makeUser({
        id: uid,
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
        city: newUser.getCity(),
        location: newUser.getLocation()
      });
    }

    return user;
  }
}

module.exports = makeAuthGoogle
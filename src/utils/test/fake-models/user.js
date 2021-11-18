const faker = require('faker');
const cuid = require('cuid');

function makeFakeUser(overrides) {
  const user = {
    id: cuid(),
    subId: cuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    reputation: faker.datatype.number(),
    imageUrl: faker.image.imageUrl(),
    proximity: faker.datatype.number(),
    locationName: faker.address.city(),
    locationCoordinates: {
      type: 'Point', 
      coordinates: [
        faker.datatype.number(), 
        faker.datatype.number()
      ]
    }
  };

  return {
    ...user,
    ...overrides
  };
}

module.exports = makeFakeUser
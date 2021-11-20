const faker = require('faker');
const cuid = require('cuid');

function makeFakeUser(overrides) {
  const base = {
    id: cuid(),
    subId: cuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    reputation: faker.datatype.number(),
    imageUrl: faker.image.imageUrl(),
    proximity: faker.datatype.number(),
    city: faker.address.city(),
    location: {
      type: 'Point', 
      coordinates: [
        faker.datatype.number(), 
        faker.datatype.number()
      ]
    }
  };

  return {
    ...base,
    ...overrides
  };
}

module.exports = makeFakeUser

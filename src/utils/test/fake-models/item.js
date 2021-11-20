const faker = require('faker');
const cuid = require('cuid');

function makeFakeItem(overrides) {
  const base = {
    id: cuid(),
    user: cuid(),
    title: faker.lorem.sentence(3, "."),
    price: faker.datatype.number(),
    description: faker.lorem.paragraph(2),
    imageUrls: [ faker.image.imageUrl() ],
    location: {
      type: 'Point', 
      coordinates: [
        faker.datatype.number(), 
        faker.datatype.number()
      ]
    },
    state: 'open',
    buyer: cuid(),
    counts: { 
      chat: faker.datatype.number(),
      favorite: faker.datatype.number(), 
      view: faker.datatype.number()
    },
    createdAt: Date.now()
  };

  return {
    ...base,
    ...overrides
  };
}

module.exports = makeFakeItem

const cuid = require('cuid');

function makeFakeFavoriteItem(overrides) {
  const base = {
    id: cuid(),
    user: cuid(),
    item: cuid(),
    createdAt: Date.now()
  };

  return {
    ...base,
    ...overrides
  };
}

module.exports = makeFakeFavoriteItem

import faker from 'faker/locale/it';

function getItems() {
  const n = faker.random.number({ min: 2, max: 5 });
  return Array.from({ length: n }, () => faker.name.findName());
}

function getItem() {
  return faker.name.findName();
}

export default { getItem, getItems };

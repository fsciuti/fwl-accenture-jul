const registry = {};

const add = (selector, component) => {
  if (typeof component !== 'function') {
    return;
  }

  registry[selector] = component;

  console.log(registry);
};

const get = (selector) => {
  return registry[selector];
};

export default { add, get };

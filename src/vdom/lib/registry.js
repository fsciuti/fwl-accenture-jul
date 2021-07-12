const registry = {};

const get = (selector) => {
  return registry[selector] ? registry[selector] : false;
};

const set = (selector, component) => {
  if (typeof component !== 'function') {
    return;
  }

  registry[selector] = component;
};

export default { set, get };

const events = {};

const get = (selector) => {
  return events[selector] ? events[selector] : false;
};

const set = (selector, callback) => {
  if (typeof callback !== 'function') {
    return;
  }

  events[selector] = callback;
};

export default { set, get };

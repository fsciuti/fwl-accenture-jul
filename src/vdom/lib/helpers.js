const cleanObject = (obj) => {
  const emptyObj = Object.create(null);
  return Object.assign(emptyObj, obj);
};

const cloneDeepObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const stringToHTML = (template) => {
  const parser = new DOMParser();
  const domElements = parser.parseFromString(template, 'text/html');
  return domElements.body;
};

export default { cloneDeepObject, cleanObject, stringToHTML };

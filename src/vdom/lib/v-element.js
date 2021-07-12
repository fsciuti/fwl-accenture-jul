import Helpers from './helpers';

const getAttributesObject = (attributes) => {
  return Array.prototype.reduce.call(attributes, (obj, attribute) => {
    return { ...obj, [attribute.name]: attribute.value };
  }, {});
};

// eslint-disable-next-line object-curly-newline
const create = ({ tagName, attrs = {}, children = [], events = [] }) => {
  return Helpers.cleanObject({
    tagName,
    attrs: Helpers.cleanObject(attrs),
    children: [...children],
    events: [...events],
  });
};

const createByNode = ($node) => {
  if ($node.nodeType === Node.TEXT_NODE) {
    return $node.textContent;
  }

  const tagName = $node.nodeType === Node.COMMENT_NODE ? 'comment' : $node.tagName.toLowerCase();
  const attrs = $node.nodeType !== Node.ELEMENT_NODE ? {} : getAttributesObject($node.attributes);

  return create({
    tagName,
    attrs,
    children: [],
  });
};

export default { createByNode, create };

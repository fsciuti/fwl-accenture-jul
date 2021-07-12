import vElement from './v-element';
import Registry from './registry';

const updateRegisteredComponents = (vNode, state) => {
  let newVNode = vNode;

  if (vNode.children) {
    const isComponent = Object.keys(newVNode.attrs).find((attr) => attr === 'data-component');
    if (isComponent) {
      const componentCallback = Registry.get(newVNode.attrs['data-component']);
      if (componentCallback) {
        newVNode = componentCallback(newVNode, state);
      }
    }

    const children = newVNode.children.map((child) => updateRegisteredComponents(child, state));
    newVNode.children = children;
  }

  return newVNode;
};

const mapNode = ($node, mapperFn) => {
  const vNode = mapperFn($node);

  if (typeof vNode === 'string') {
    return vNode;
  }

  vNode.children = Array.prototype.map.call($node.childNodes, ($childNode) => {
    return mapNode($childNode, mapperFn);
  });
  return vNode;
};

const mapRootNode = ($target, state) => {
  const createVElement = ($node) => vElement.createByNode($node);
  return updateRegisteredComponents(mapNode($target, createVElement), state);
};

export default { updateRegisteredComponents, mapRootNode };

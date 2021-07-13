/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import render from './render';
import mount from './mount';

const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffAttrs = (oldAttrs = {}, newAttrs = {}) => {
  const patches = [];

  // Nuovi Attributi
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push(($node) => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push(($node) => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return ($node) => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

const diffChildren = (oldVChildren = [], newVChildren = []) => {
  const patches = [];

  oldVChildren.forEach((oldVChild, i) => {
    patches.push(diff(oldVChild, newVChildren[i]));
  });

  const addPatches = [];
  for (const newVChild of newVChildren.slice(oldVChildren.length)) {
    addPatches.push(($node) => {
      $node.append(render(newVChild));
      return $node;
    });
  }

  return ($parent) => {
    for (const [patch, $child] of zip(patches, $parent.childNodes)) {
      patch($child);
    }

    for (const patch of addPatches) {
      patch($parent);
    }
  };
};

function diff(oldVNode, newVNode) {
  // *** newVNode non presente ***
  if (newVNode === undefined) {
    // rimuovere vecchio nodo
    return ($node) => {
      $node.remove();
      return undefined;
    };
  }

  // *** newVNode o oldVNode sono textNode ***
  if (typeof oldVNode === 'string' || typeof newVNode === 'string') {
    if (oldVNode !== newVNode) {
      return ($node) => {
        const $newNode = render(newVNode);
        mount($newNode, $node);
        return $newNode;
      };
    }

    return ($node) => $node;
  }

  // *** newVNode e oldVNode sono Elements ma con tag differente ***
  if (oldVNode.tagName !== newVNode.tagName) {
    return ($node) => {
      const $newNode = render(newVNode);
      mount($newNode, $node);
      return $newNode;
    };
  }

  // *** newVNode e oldVNode sono Elements e di tipo uguale ***
  // Raccogliamo le patches per gli attributi
  const patchAttrs = diffAttrs(oldVNode.attrs, newVNode.attrs);
  // Raccogliamo le patches per i figli
  const patchChildren = diffChildren(oldVNode.children, newVNode.children);

  return ($node) => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
}

export default diff;

export default function render(vNode) {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }

  const $node = document.createElement(vNode.tagName);
  Object.entries(vNode.attrs).forEach((attr) => $node.setAttribute(attr[0], attr[1]));
  vNode.children.forEach((child) => $node.appendChild(render(child)));

  vNode.events.map((eventItem) => {
    const $selectedNode = eventItem.selector ? $node.querySelector(eventItem.selector) : $node;
    return $selectedNode.addEventListener(eventItem.event, eventItem.callback);
  });

  return $node;
}

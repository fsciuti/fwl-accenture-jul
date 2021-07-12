import * as VDom from '../vdom/vdom';

export default (vTarget, template, vEvents = []) => {
  const $nodeByTemplate = VDom.helpers.stringToHTML(template);
  const vNodes = VDom.mapper.mapRootNode($nodeByTemplate);

  const clonedVEvents = vEvents.map((eventItem) => {
    const callback = VDom.events.get(eventItem.callback);
    return callback ? { ...eventItem, callback } : {};
  });

  return VDom.vElement.create({
    ...vTarget,
    children: [...vNodes.children],
    events: [...clonedVEvents],
  });
};

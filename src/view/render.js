import Registry from './registry';

const renderWrapper = (component) => {
  return (target, state) => {
    const cloneTarget = component(target, state);
    const childComponents = cloneTarget.querySelectorAll('[data-component]');

    childComponents.forEach((targetChild) => {
      const selector = targetChild.dataset.component;
      const child = Registry.get(selector);
      if (!child) {
        return;
      }

      targetChild.replaceWith(child(targetChild, state));
    });
    return cloneTarget;
  };
};

const renderRoot = (target, state) => {
  const cloneComponent = (root) => root.cloneNode(true);
  return renderWrapper(cloneComponent)(target, state);
};

export default { renderRoot };

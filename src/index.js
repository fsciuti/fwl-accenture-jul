import FakeData from './fake-data';
import RenderEngine from './view/render';

import items from './view/components/items';
import counter from './view/components/counter';

import Registry from './view/registry';

const state = {
  items: FakeData.getItems(),
};

let app = document.getElementById('app');

Registry.add('item-list', items.createItemList);
Registry.add('item-counter', counter);

const render = (newState) => {
  window.requestAnimationFrame(() => {
    const clonedApp = RenderEngine.renderRoot(app, newState);
    app.replaceWith(clonedApp);
    app = clonedApp;
  });
};

document.querySelector('[data-component=item-filter]').addEventListener('input', (evt) => {
  const filteredItems = state.items.filter((item) => {
    return item.toLowerCase().includes(evt.target.value.toLowerCase());
  });

  render({ ...state, items: filteredItems });
});

document.querySelector('[data-component=item-add]').addEventListener('click', () => {
  const newItem = FakeData.getItem();
  state.items.push(newItem);
  render({ ...state });
  document.querySelector('[data-component=item-filter]').dispatchEvent(new Event('input'));
});

render({ ...state });

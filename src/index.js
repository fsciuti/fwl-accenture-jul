import FakeData from './fake-data';

import * as vDom from './vdom/vdom';

import items from './view/components/items';
import counter from './view/components/counter';
import button from './view/components/button';
import filter from './view/components/filter';

const state = { items: FakeData.getItems() };

let app = document.querySelector('#app');

vDom.registry.set('item-list', items);
vDom.registry.set('item-counter', counter);
vDom.registry.set('item-button', button);
vDom.registry.set('item-filter', filter);

let previousVDom = {};

const render = (newState) => {
  window.requestAnimationFrame(() => {
    const clonedVDom = vDom.mapper.mapRootNode(app, newState);
    const patch = vDom.diff(previousVDom, clonedVDom);
    app = patch(app);
    previousVDom = clonedVDom;
  });
};

vDom.events.set('filter', (evt) => {
  const filteredItems = state.items.filter((item) => {
    return item.toLowerCase().includes(evt.target.value.toLowerCase());
  });

  render({ ...state, items: filteredItems });
});

vDom.events.set('add', () => {
  const newItem = FakeData.getItem();
  state.items.push(newItem);
  render({ ...state });
});

render({ ...state });

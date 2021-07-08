import FakeData from './fake-data';
import Items from './view/components/items';
import counter from './view/components/counter';

const state = {
  items: FakeData.getItems(),
};

const app = document.getElementById('app');
const ul = document.createElement('ul');
ul.className = 'list-group';

const p = document.createElement('p');
p.className = 'alert';
p.innerText = 'Qui ci andranno gli items';

const input = document.createElement('input');
input.className = 'form-control';
input.addEventListener('input', (evt) => {
  let ulCloned = app.querySelector('ul').cloneNode(false);
  const filteredItems = state.items.filter((item) => {
    return item.toLowerCase().includes(evt.target.value.toLowerCase());
  });

  ulCloned = Items.createItemList(ulCloned, filteredItems);
  app.querySelector('ul').replaceWith(ulCloned);
});

const button = document.createElement('button');
button.innerText = 'Aggiungi';
button.className = 'btn btn-primary';
button.addEventListener('click', () => {
  const newItem = FakeData.getItem();
  state.items.push(newItem);
  window.requestAnimationFrame(() => {
    app.querySelector('ul').append(Items.createItem(newItem));
    input.dispatchEvent(new Event('input'));
  });
});

app.append(document.createElement('hr'));
app.append(input);
app.append(document.createElement('hr'));
app.append(p);
app.append(document.createElement('hr'));
app.append(ul);
app.append(document.createElement('hr'));
app.append(button);

window.requestAnimationFrame(() => {
  const ulToReplace = Items.createItemList(ul, state.items);
  ul.replaceWith(ulToReplace);

  const pToReplace = counter(ul, state.items);
  p.replaceWith(pToReplace);
});

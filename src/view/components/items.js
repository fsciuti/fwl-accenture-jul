const createItem = (item) => {
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  li.innerText = item;
  return li;
};

const createItemList = (target, items) => {
  const cloneTarget = target.cloneNode(false);
  items.forEach((item) => {
    cloneTarget.append(createItem(item));
  });

  return cloneTarget;
};

export default { createItem, createItemList };

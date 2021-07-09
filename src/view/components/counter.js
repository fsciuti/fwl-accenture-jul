const getCount = (items) => {
  return items.length === 1 ? '1 Item' : `${items.length} Items`;
};

export default (target, { items = 0 }) => {
  const cloneTarget = target.cloneNode(true);
  cloneTarget.innerText = getCount(items);
  return cloneTarget;
};

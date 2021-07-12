import component from '../component';

const getCount = (items) => {
  return items.length === 1 ? '1 Item' : `${items.length} Items`;
};

const getHTML = (items) => `<strong>${getCount(items)}</strong>`;

export default (vTarget, { items = [] }) => {
  return component(vTarget, getHTML(items));
};

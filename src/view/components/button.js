import component from '../component';

const getHTML = () => 'Aggiungi';

export default (vTarget, state = {}) => {
  const vEvents = [{
    event: 'click',
    selector: '',
    callback: 'add',
  }];

  return component(vTarget, getHTML(state), vEvents);
};

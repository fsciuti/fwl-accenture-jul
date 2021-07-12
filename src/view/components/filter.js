import component from '../component';

const getHTML = () => '';

export default (vTarget, state = {}) => {
  const vEvents = [{
    event: 'input',
    selector: '',
    callback: 'filter',
  }];

  return component(vTarget, getHTML(state), vEvents);
};

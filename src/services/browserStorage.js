import localforage from 'localforage';
import { toJS } from 'mobx';

const addToStorage = (data) => {
  const toJsedData = toJS(data);
  return localforage.setItem('getApiState', toJsedData)
    .then(items => items);
};

const getFromStorage = () => {
  return localforage.getItem('getApiState')
    .then(items => items)
    .catch(error => error);
};

export {
  addToStorage,
  getFromStorage,
};

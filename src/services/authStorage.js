import localforage from 'localforage';

const setTokenToStorage = (token) => {
  return localforage.setItem('id_token', token)
    .then(res => res);
};

const getTokenFromStorage = () => {
  return localforage.getItem('id_token')
    .then(res => res)
    .catch(error => error);
};

const removeTokenFromStorage = () => {
  return localforage.removeItem('id_token')
    .then(() => getTokenFromStorage().then(res => res))
    .catch(err => err);
};

export {
  setTokenToStorage,
  getTokenFromStorage,
  removeTokenFromStorage,
};

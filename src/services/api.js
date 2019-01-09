import fetch from 'isomorphic-fetch';

const searchUser = (query, token) => {
  return fetch(`https://api.github.com/search/users?q=${query}`, {
    method: 'GET',
    headers: { authorization: token },
  })
    .then(result => result.json())
    .then(({ items }) => items)
    .catch(error => error);
};

const getUser = (id, token) => {
  return fetch(`https://api.github.com/user/${id}`, {
    method: 'GET',
    headers: { authorization: token },
  })
    .then(result => result.json())
    .then(data => data.created_at)
    .catch(error => error);
};

const getRepos = (userName, token) => {
  return fetch(`https://api.github.com/users/${userName}/repos`, {
    method: 'GET',
    headers: { authorization: token },
  })
    .then(result => result.json())
    .catch(error => error);
};

const loginToApi = (data) => {
  return fetch('https://test-githut-login-app.herokuapp.com/api/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(result => result.json());
};

const registerToApi = (data) => {
  return fetch('https://test-githut-login-app.herokuapp.com/api/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(result => result.json());
};

export {
  searchUser,
  getUser,
  getRepos,
  loginToApi,
  registerToApi,
};

import { searchUser, getUser, getRepos } from './api';

const getUsers = (searchInput) => {
  return searchUser(searchInput)
    .then(data => data);
};

const addUser = (id, login) => {
  return getUser(id)
    .then((createdAt) => {
      const newUser = {
        id,
        login,
        createdAt,
      };

      return newUser;
    });
};

const getUserRepo = (userName, users) => {
  return getRepos(userName)
    .then((repos) => {
      return users.map((user) => {
        const { login } = user;
        if (login === userName) {
          const newUser = { ...user, repos };
          return newUser;
        }
        return user;
      });
    });
};

const getSingleUserRepos = (user) => {
  return getRepos(user.login)
    .then((repos) => {
      const newUser = { ...user, repos };
      return newUser;
    });
};

export {
  getUsers,
  addUser,
  getUserRepo,
  getSingleUserRepos,
};


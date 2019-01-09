import { observable, action, runInAction } from 'mobx';
import { addToStorage, getFromStorage } from './browserStorage';
import { getTokenFromStorage } from './authStorage';
import { searchUser, getUser, getRepos } from './api';

class Store {
  @observable users = [];
  @observable profiles = [];

  constructor() {
    getFromStorage().then((users) => {
      if (users !== null) {
        this.setUsers(users);
      }
    });
  }

  @action
  getUsers() {
    return this.users;
  }

  @action
  setUsers(users) {
    this.users = users;
  }
  @action
  getProfiles() {
    return this.profiles;
  }

  @action
  setProfiles(profiles) {
    this.profiles = profiles;
  }

  @action
  searchProfiles(searchInput) {
    getTokenFromStorage().then((tokenId) => {
      searchUser(searchInput, tokenId)
        .then((data) => {
          runInAction(() => {
            const users = this.getUsers();
            const newData = data && data.map(obj => users.find(p => p.login === obj.login) || obj);
            this.setProfiles(newData);
          });
        });
    });
  }

  @action
  addUser(id, login) {
    getTokenFromStorage().then((tokenId) => {
      getUser(id, tokenId)
        .then((createdAt) => {
          const newUser = {
            id,
            login,
            createdAt,
          };

          const profiles = this.getProfiles();

          const newData = profiles.map((profile) => {
            const isAdded = newUser.createdAt;
            if (profile.login === newUser.login) {
              const newProfile = { ...profile, createdAt: isAdded };
              return newProfile;
            }
            return profile;
          });

          this.setProfiles(newData);

          runInAction(() => {
            this.setUsers([...this.users, newUser]);
            addToStorage(this.users);
          });
        });
    });
  }

  @action
  removeUser(login) {
    const users = this.getUsers();
    const newUsers = users.filter(user => user.login !== login);
    this.setUsers(newUsers);
    addToStorage(this.users);
  }

  @action
  addUsersRepos(userName, users) {
    getTokenFromStorage().then((tokenId) => {
      getRepos(userName, tokenId)
        .then((repos) => {
          const newUsers = users.map((user) => {
            const { login } = user;
            if (login === userName) {
              const newUser = { ...user, repos };
              return newUser;
            }
            return user;
          });

          runInAction(() => {
            this.setUsers(newUsers);
            addToStorage(this.users);
          });
        });
    });
  }

  @action
  refreshRepos(users) {
    const promises = users.map((user) => {
      return getRepos(user.login)
        .then((repos) => {
          const newUser = { ...user, repos };
          return newUser;
        });
    });
    Promise.all(promises).then((newUsers) => {
      runInAction(() => {
        this.setUsers(newUsers);
        addToStorage(this.users);
      });
    });
  }
}

export default Store;

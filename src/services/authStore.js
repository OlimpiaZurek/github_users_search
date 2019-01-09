import PubSub from 'pubsub-js';
import { loginToApi, registerToApi } from './api';
import { setTokenToStorage, getTokenFromStorage, removeTokenFromStorage } from './authStorage';

class AuthStore {
  token = null;
  isLogged = false;
  isRegistered = false;
  tokenDetermined = false;

  constructor() {
    getTokenFromStorage().then((token) => {
      if (token !== null) {
        this.setToken(token);
      }
      this.tokenDetermined = true;
      PubSub.publish('FINISHED_DETERMINING_TOKEN');
    });
  }

  getToken() {
    return this.token;
  }

  isTokenDetermined() {
    return this.tokenDetermined;
  }

  setToken(token) {
    this.token = token;
  }

  logIn(data) {
    return loginToApi(data).then(({ token }) => {
      if (token) {
        this.setToken(token);
        this.isLogged = true;
        setTokenToStorage(this.token);
      } else {
        throw new Error();
      }
    });
  }

  logOut() {
    removeTokenFromStorage();
    this.isLogged = false;
  }

  register(data) {
    return registerToApi(data).then((res) => {
      if (res.status === 'OK') {
        this.isRegistered = true;
      } else {
        throw new Error(res.status);
      }
    });
  }
}

export default new AuthStore();


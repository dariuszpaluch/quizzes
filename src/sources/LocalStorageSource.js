const TOKEN_KEY = 'token';
const LAST_TOKEN_UPDATE_DATE = 'lastTokenUpdateDate';

export default class LocalStorageSource {
  static getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  static setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(LAST_TOKEN_UPDATE_DATE, new Date());
  }

  static deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LAST_TOKEN_UPDATE_DATE);
    return true;
  }
}

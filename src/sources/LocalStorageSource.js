export default class LocalStorageSource {
  static getToken() {
    return localStorage.getItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
    localStorage.setItem('lastTokenUpdateDate', new Date());
  }

  static deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('lastTokenUpdateDate');
    return true;
  }
}

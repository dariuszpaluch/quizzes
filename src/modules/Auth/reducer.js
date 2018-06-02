import { createReducer } from 'utils/reducerUtils';

import LocalStorageSource from 'sources/LocalStorageSource';

import { SIGN_IN, LOGOUT,    USER_INFO } from './actionTypes';




function getInitState() {
  return {
    token: LocalStorageSource.getToken(),
    user: {}
  };
}

function signInSuccess(authState, action) {
  const token = action.data.token;
  LocalStorageSource.setToken(token);

  return {
    ...authState,
    token
  };
}

function removeToken(authState) {
  LocalStorageSource.deleteToken();

  return {
    ...authState,
    token: null
  };
}

function logout() {
  LocalStorageSource.deleteToken();
  return {};
}

function getUserInfoSuccess(authState, action) {
  return {
    ...authState,
    user: action.data
  };
}

export default createReducer(getInitState(), {
  [`${SIGN_IN}_SUCCESS`]: signInSuccess,
  [`${SIGN_IN}_REQUEST`]: removeToken,
  [`${SIGN_IN}_FAILURE`]: removeToken,

  [`${USER_INFO}_SUCCESS`]: getUserInfoSuccess,
  [LOGOUT]: logout
});

export const getToken = state => state.auth.token;
export const isUserLoggedIn = state => !!state.auth.token;
export const getUserData = state => state.auth.user;

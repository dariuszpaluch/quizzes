import {createReducer} from 'utils/reducerUtils';

import {SIGN_IN} from './actionTypes';
import LocalStorageSource from 'src/sources/LocalStorageSource';

function getInitState() {
  return {
    token: null,
  };
}

function signInSuccess(authState, action) {
  LocalStorageSource.setToken(action.token);
  return {
    ...authState,
    token: action.data.token,
  }
}

function removeToken(authState) {
  LocalStorageSource.deleteToken();
  return {
    ...authState,
    token: null,
  }
}

export default createReducer(getInitState(), {
  [`${SIGN_IN}_SUCCESS`]: signInSuccess,
  [`${SIGN_IN}_REQUEST`]: removeToken,
  [`${SIGN_IN}_FAILURE`]: removeToken,
});

export const getToken = (state) => state.auth.token;
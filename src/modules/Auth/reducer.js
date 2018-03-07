import {createReducer} from 'utils/reducerUtils';

import {SIGN_IN} from './actionTypes';
import LocalStorageSource from 'sources/LocalStorageSource';

function getInitState() {
  return {
    token: null,
  };
}

function signInSuccess(authState, action) {
  const token = action.data.token;
  LocalStorageSource.setToken(token);

  return {
    ...authState,
    token,
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
import { dispatchPromiseResult, storeAction } from 'actions/actionsUtils';
import fetchAPI from 'utils/fetch';

import { SIGN_IN, SIGN_UP, LOGOUT, USER_INFO } from './actionTypes';
import { API_URL } from 'settings';

export function signIn({ login, password }, resolve = null, reject = null) {
  const body = {
    login,
    password
  };

  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: SIGN_IN,
      promise: fetchAPI.post.bind(null, `${API_URL}/authenticate`, { body }),
      resolve,
      reject
    });
  };
}

export function signUp(body, resolve, reject) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: SIGN_UP,
      promise: fetchAPI.post.bind(null, `${API_URL}/signup`, { body }),
      resolve,
      reject: () => {
        // toastr.error('Wystąpił problem z wyszukaniem segmentów')
      }
    });
  };
}

export function getUserInfo(resolve, reject) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: USER_INFO,
      promise: fetchAPI.get.bind(null, `${API_URL}/userinfo`),
      resolve,
      reject
    });
  };
}

export function signInByQuerytoken(token) {
  return storeAction(
    `${SIGN_IN}_SUCCESS`,
    {},
    {
      token
    }
  );
}

export function logout() {
  return storeAction(LOGOUT);
}

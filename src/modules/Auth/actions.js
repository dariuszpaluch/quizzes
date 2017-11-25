import {dispatchPromiseResult} from 'actions/actionsUtils';
import fetchAPI from 'utils/fetch';

import { SIGN_IN } from './actionTypes';
export function signIn({ login, password}, resolve = null, reject = null) {
  const body = {
    name: login,
    password,
  };

  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: SIGN_IN,
      promise: fetchAPI.post.bind(null, 'http://localhost:3000/authenticate', { body }),
      resolve,
      // reject: () => {
        // toastr.error('Wystąpił problem z wyszukaniem segmentów')
      // }
    });
  };
}


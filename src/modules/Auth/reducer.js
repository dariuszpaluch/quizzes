import {createReducer, updateObject} from 'utils/reducerUtils';

import {SIGN_IN} from './actionTypes';
function authenticateSuccess(state, {data}) {
  return updateObject(state, {
    token: data.token,
  })
}

function getInitState() {
  return {
    token: null,
  };
}

export default createReducer(getInitState(), {
  [`${SIGN_IN}_SUCCESS`]: getInitState,
});

export const getToken = (state) => state.auth.token;
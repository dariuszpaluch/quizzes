import {createReducer, updateObject} from 'utils/reducerUtils';

import { GET_TESTS, GET_TEST } from './actionTypes';
import normalizeList from "utils/normalizeList";

function getInitState() {
  return {
    testsList: {
      byId: {},
      allIds: [],
    },
  };
}

function getTestsSuccess(state, action) {

  return updateObject(state, { testsList: normalizeList(action.data) })
}

function getTestSuccess(state, action) {
  const test = action.data;

  return updateObject(state, {
    testsList: {
      ...state.testsList,
      byId: {
        ...state.testsList.byId,
        [test.id]: test,
      }
    }
  })
}

export default createReducer(getInitState(), {
  [`${GET_TESTS}_SUCCESS`]: getTestsSuccess,
  [`${GET_TEST}_SUCCESS`]: getTestSuccess,
});

export const getToken = (state) => state.auth.token;
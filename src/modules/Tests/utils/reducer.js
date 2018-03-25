import {createReducer, updateObject} from 'utils/reducerUtils';
import filter from 'lodash/filter';

import { GET_TESTS } from './actionTypes';
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

export default createReducer(getInitState(), {
  [`${GET_TESTS}_SUCCESS`]: getTestsSuccess,
});

export const getToken = (state) => state.auth.token;
import {createReducer} from 'utils/reducerUtils';

import { FETCH_QUESTIONS } from './actionTypes';

function getInitState() {
  return {
    questions: [],
  };
}

function fetchQuestionsSuccess(testState, action) {
  return {
    ...testState,
    questions: action.data,
  }
}

export default createReducer(getInitState(), {
  [`${FETCH_QUESTIONS}_SUCCESS`]: fetchQuestionsSuccess,
});

export const getToken = (state) => state.auth.token;
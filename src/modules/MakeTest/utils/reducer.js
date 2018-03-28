import {createReducer, updateObject} from 'utils/reducerUtils';

import { FETCH_TEST_TO_BE_COMPLETED } from './actionTypes';
import normalizeList from 'utils/normalizeList';
import { SET_QUESTION_ANSWER } from 'modules/MakeTest/utils/actionTypes';

function getInitState() {
  return {
    testData: null,
    questions: {
      byId: {},
      allIds: [],
    },
    fetching: false,
    answers: {},
  };
}

function fetchTestToBeCompletedSuccess(state, action) {
  const test = action.data;

  return updateObject(state, {
    testData: {
      ...test,
      created: test.created && new Date(test.created),
    },
    questions: normalizeList(test.questions),
    fetching: false,
  })
}

function fetchTestToBeCompletedFailure(state) {
  return updateObject(state, {
    ... getInitState(),
    fetching: false,
  })
}
function fetchTestToBeCompletedRequest(state,) {
  return updateObject(state, {
    ... getInitState(),
    fetching: true,
  })
}

function setQuestionAnswer(state, action) {
  const {questionId, answer} = action.data;

  return updateObject(state, {
    answers: {
      ...state.answers,
      [questionId]: answer,
    }
  })
}

export default createReducer(getInitState(), {
  [`${FETCH_TEST_TO_BE_COMPLETED}_REQUEST`]: fetchTestToBeCompletedRequest,
  [`${FETCH_TEST_TO_BE_COMPLETED}_SUCCESS`]: fetchTestToBeCompletedSuccess,
  [`${FETCH_TEST_TO_BE_COMPLETED}_FAILURE`]: fetchTestToBeCompletedFailure,
  [SET_QUESTION_ANSWER]: setQuestionAnswer,
});
import {createReducer, updateObject} from 'utils/reducerUtils';

import { FETCH_TEST_TO_BE_COMPLETED } from './actionTypes';
import normalizeList from 'utils/normalizeList';
import { SET_QUESTION_ANSWER, SET_QUESTION_RATE, SET_TEST_RATING } from 'modules/MakeTest/utils/actionTypes';
import omit from 'lodash/omit';

function getInitState() {
  return {
    testData: null,
    questions: {
      byId: {},
      allIds: [],
    },
    fetching: false,
    answers: {},
    questionRating: {},
  };
}

function fetchTestToBeCompletedSuccess(state, action) {
  const test = action.data;

  return updateObject(state, {
    testData: {
      ...omit(test, 'questions'),
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

const setQuestionRate = (state, action) => {
  const { questionId, rating } = action.data;

  return {
    ...state,
    questionRating: {
      [questionId]: rating,
    }
  }
};

const changeTestRating = (state, action) => ({
    ...state,
    testRating: action.testRating,
});

export default createReducer(getInitState(), {
  [`${FETCH_TEST_TO_BE_COMPLETED}_REQUEST`]: fetchTestToBeCompletedRequest,
  [`${FETCH_TEST_TO_BE_COMPLETED}_SUCCESS`]: fetchTestToBeCompletedSuccess,
  [`${FETCH_TEST_TO_BE_COMPLETED}_FAILURE`]: fetchTestToBeCompletedFailure,
  [SET_QUESTION_ANSWER]: setQuestionAnswer,
  [SET_QUESTION_RATE]: setQuestionRate,
  [`${SET_TEST_RATING}_SUCCESS`]: changeTestRating,
});
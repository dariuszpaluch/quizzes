import { dispatchPromiseResult, storeAction } from 'actions/actionsUtils';
import fetchAPI from 'utils/fetch';
import { API_URL } from 'settings';

import {
  FETCH_TEST_TO_BE_COMPLETED,
  SAVE_TEST_ANSWERS,
  SET_QUESTION_ANSWER,
  SET_QUESTION_RATE,
  SET_TEST_RATING,
  GET_TEST_RESULT
} from 'modules/MakeTest/utils/actionTypes';

export function fetchTestToBeCompleted(testId, resolve, reject) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: FETCH_TEST_TO_BE_COMPLETED,
      promise: fetchAPI.get.bind(null, `${API_URL}/tests/${testId}/toCompleted`),
      resolve,
      reject
    });
  };
}

export function setQuestionAnswer(questionId, answer) {
  return storeAction(SET_QUESTION_ANSWER, null, {
    answer,
    questionId
  });
}

export function saveTestAnswers(testId, answers, resolve, reject) {
  const body = {
    answers
  };

  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: SAVE_TEST_ANSWERS,
      promise: fetchAPI.post.bind(null, `${API_URL}/tests/${testId}/answers`, { body }),
      resolve,
      reject
    });
  };
}

export function onChangeQuestionRate(questionId, rating) {
  return storeAction(SET_QUESTION_RATE, null, {
    questionId,
    rating
  });
}

// export const changeTestRating = (testRating) => storeAction(CHANGE_TEST_RATING, null, { testRating });
export const changeTestRating = (testId, testRating) => {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: SET_TEST_RATING,
      promise: fetchAPI.put.bind(null, `${API_URL}/tests/${testId}/rating`, {
        body: {
          rating: testRating
        }
      }),
      payload: {
        testRating
      }
    });
  };
};

export function getTestResult(testAnswerId, resolve, reject) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: GET_TEST_RESULT,
      promise: fetchAPI.get.bind(null, `${API_URL}/test-answers/${testAnswerId}`),
      resolve,
      reject
    });
  };
}

import { dispatchPromiseResult, storeAction } from 'actions/actionsUtils';
import fetchAPI from 'utils/fetch';
import { API_URL } from 'src/settings';

import { FETCH_TEST_TO_BE_COMPLETED, SAVE_TEST_ANSWERS, SET_QUESTION_ANSWER } from 'modules/MakeTest/utils/actionTypes';

export function fetchTestToBeCompleted(testId, resolve, reject) {
  console.log(`${API_URL}/tests/${testId}/toCompleted`);

  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: FETCH_TEST_TO_BE_COMPLETED,
      promise: fetchAPI.get.bind(null, `${API_URL}/tests/${testId}/toCompleted`),
      resolve,
      reject,
    });
  }
}

export function setQuestionAnswer(questionId, answer) {
  return storeAction(SET_QUESTION_ANSWER, null, {
    answer,
    questionId,
  })
}

export function saveTestAnswers(testId, answers, resolve, reject) {
  const body = {
    answers,
  };

  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: SAVE_TEST_ANSWERS,
      promise: fetchAPI.post.bind(null, `${API_URL}/tests/${testId}/answers`, { body }),
      resolve,
      reject,
    });
  }
}
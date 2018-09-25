import { dispatchPromiseResult } from 'actions/actionsUtils';
import fetchAPI from 'utils/fetch';
import { ADD_TEST, GET_TESTS, GET_TEST, GET_TEST_DETAILS, GET_TEST_RESULT } from './actionTypes';
import { API_URL } from 'settings';
import { DELETE_TEST, SAVE_TEST } from 'modules/Tests/utils/actionTypes';

export function addTest({ name, description, questionsIds }, resolve = null, reject = null) {
  const body = {
    name,
    description,
    questions: questionsIds
  };

  return dispatch => {
    dispatchPromiseResult(dispatch, {
      actionType: ADD_TEST,
      promise: fetchAPI.post.bind(null, `${API_URL}/tests`, { body }),
      resolve,
      reject
    });
  };
}

export function saveTest(
  testId,
  { name, description, questionsIds },
  resolve = null,
  reject = null
) {
  const body = {
    name,
    description,
    questions: questionsIds
  };

  return dispatch => {
    dispatchPromiseResult(dispatch, {
      actionType: SAVE_TEST,
      promise: fetchAPI.put.bind(null, `${API_URL}/tests/${testId}`, { body }),
      resolve,
      reject
    });
  };
}

export const deleteTest = (testId, resolve = null, reject = null) => dispatch =>
  dispatchPromiseResult(dispatch, {
    actionType: DELETE_TEST,
    promise: fetchAPI.delete.bind(null, `${API_URL}/tests/${testId}`),
    resolve,
    reject
  });

export function getTestsRequest(onlyMine, resolve, reject) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: GET_TESTS,
      promise: fetchAPI.get.bind(null, `${API_URL}/tests`),
      resolve,
      reject
    });
  };
}

export function getTestsToCompleteRequest(resolve, reject) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: GET_TESTS,
      promise: fetchAPI.get.bind(null, `${API_URL}/tests-to-complete`),
      resolve,
      reject
    });
  };
}

export function getTestDetail(testId, resolve, reject) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: GET_TEST_DETAILS,
      promise: fetchAPI.get.bind(null, `${API_URL}/tests/${testId}/details`),
      resolve,
      reject
    });
  };
}

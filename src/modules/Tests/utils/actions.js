import {dispatchPromiseResult} from 'actions/actionsUtils';
import fetchAPI from 'utils/fetch';
import {ADD_TEST, GET_TESTS, GET_TEST, GET_TEST_DETAILS} from './actionTypes';
import { API_URL } from 'settings';

export function addTest({ name, description, questionsIds}, resolve = null, reject = null) {
  const body = {
    name,
    description,
    questions: questionsIds,
  };

  return dispatch => {
    dispatchPromiseResult(dispatch, {
      actionType: ADD_TEST,
      promise: fetchAPI.post.bind(null, `${API_URL}/tests`, {body}),
      resolve,
      reject,
    });
  };
}

export function getTestsRequest(onlyMine, resolve, reject) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: GET_TESTS,
      promise: fetchAPI.get.bind(null, `${API_URL}/tests`),
      resolve,
      reject,
    });
  }
}

export function getTestDetail(testId, resolve, reject) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: GET_TEST_DETAILS,
      promise: fetchAPI.get.bind(null, `${API_URL}/tests/${testId}/details`),
      resolve,
      reject,
    })
  }
}

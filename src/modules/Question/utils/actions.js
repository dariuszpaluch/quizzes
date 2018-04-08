import {dispatchPromiseResult} from 'actions/actionsUtils';
import fetchAPI from 'utils/fetch';
import {ADD_QUESTION, FETCH_QUESTIONS, DELETE_QUESTION} from './actionTypes';
import {FETCH_QUESTION} from "modules/Question/utils/actionTypes";
import { API_URL } from 'src/settings';

export function addQuestion({question, description, answers}, resolve = null, reject = null) {
  const body = {
    question,
    description,
    answers,
  };

  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: ADD_QUESTION,
      promise: fetchAPI.post.bind(null, `${API_URL}/questions`, {body}),
      resolve,
      reject,
    });
  };
}

export function fetchQuestions(resolve = null, reject = null) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: FETCH_QUESTIONS,
      promise: fetchAPI.get.bind(null, `${API_URL}/questions`),
      resolve,
      reject,
    });
  };
}


export function fetchQuestion(questionId, resolve = null, reject = null) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: FETCH_QUESTION,
      promise: fetchAPI.get.bind(null, `${API_URL}/questions/${questionId}`),
      resolve,
      reject,
      payload: {
        questionId,
      }
    });
  };
}


export function deleteQuestion(questionId, resolve = null, reject = null) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: DELETE_QUESTION,
      promise: fetchAPI.delete.bind(null, `${API_URL}/questions/${questionId}`),
      resolve,
      reject,
      payload: {
        questionId
      }
    });
  };
}

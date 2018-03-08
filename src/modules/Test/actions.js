import {dispatchPromiseResult} from 'actions/actionsUtils';
import fetchAPI from 'utils/fetch';
import {ADD_QUESTION, FETCH_QUESTIONS} from './actionTypes';

export function addTest({question, description, answers}, resolve = null, reject = null) {
  const body = {
    question,
    description,
    answers,
  };

  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: ADD_QUESTION,
      promise: fetchAPI.post.bind(null, 'http://localhost:3000/questions', {body}),
      resolve,
      reject,
    });
  };
}

export function fetchQuestions(resolve = null, reject = null) {
  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: FETCH_QUESTIONS,
      promise: fetchAPI.get.bind(null, 'http://localhost:3000/questions'),
      resolve,
      reject,
    });
  };
}
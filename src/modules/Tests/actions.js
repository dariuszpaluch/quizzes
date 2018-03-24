import {dispatchPromiseResult} from 'actions/actionsUtils';
import fetchAPI from 'utils/fetch';
import {ADD_TEST} from './actionTypes';

export function addTest({ name, description, questionsIds}, resolve = null, reject = null) {
  const body = {
    name,
    description,
    questionsIds,
  };

  return dispatch => {
    return dispatchPromiseResult(dispatch, {
      actionType: ADD_TEST,
      promise: fetchAPI.post.bind(null, 'http://localhost:3000/tests', {body}),
      resolve,
      reject,
    });
  };
}
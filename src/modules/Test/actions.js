import {dispatchPromiseResult} from 'actions/actionsUtils';
import fetchAPI from 'utils/fetch';
import { ADD_QUESTION } from './actionTypes';

export function signIn({question, description}, resolve = null, reject = null) {
  const body = {
    question,
    description,
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
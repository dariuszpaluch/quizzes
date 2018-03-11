import {createReducer} from 'utils/reducerUtils';
import filter from 'lodash/filter';

import { FETCH_QUESTIONS, DELETE_QUESTION } from './actionTypes';
import {FETCH_QUESTION} from "modules/Test/actionTypes";
import normalizeList from "utils/normalizeList";

function getInitState() {
  return {
    questions: [],
  };
}

function fetchQuestionsSuccess(testState, action) {
  return {
    ...testState,
    questions: normalizeList(action.data),
  }
}

function deleteQuestionSuccess(questionState, action) {
  return {
    ...questionState,
    questions: {
      ...questionState.questions,
      byId: filter(questionState.questions.byId, question => question.id !== action.questionId)
    }
  }
}

function fetchQuestionDetailsSuccess(questionState, action) {
  return {
    ...questionState,
    questions: {
      ...questionState.questions,
      byId: {
        ...questionState.questions.byId,
        [action.data.id]: action.data,
      }
    }
  }
}

export default createReducer(getInitState(), {
  [`${FETCH_QUESTIONS}_SUCCESS`]: fetchQuestionsSuccess,
  [`${DELETE_QUESTION}_SUCCESS`]: deleteQuestionSuccess,
  [`${FETCH_QUESTION}_SUCCESS`]: fetchQuestionDetailsSuccess,
});

export const getToken = (state) => state.auth.token;
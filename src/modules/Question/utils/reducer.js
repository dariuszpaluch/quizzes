import { createReducer, updateObject } from 'utils/reducerUtils';
import filter from 'lodash/filter';

import { FETCH_QUESTIONS, DELETE_QUESTION, ADD_QUESTION } from './actionTypes';
import { FETCH_QUESTION } from 'modules/Question/utils/actionTypes';
import normalizeList from 'utils/normalizeList';

function getInitState() {
  return {
    questions: {
      byId: {},
      allIds: [],
    }
  };
}

function fetchQuestionsSuccess(questionState, action) {
  return {
    ...questionState,
    questions: normalizeList(action.data),
    isFetching: false,
  };
}

function deleteQuestionSuccess(questionState, action) {
  return {
    ...questionState,
    questions: {
      ...questionState.questions,
      allIds: filter(questionState.questions.allIds, questionId => questionId !== action.questionId)
    }
  };
}

function fetchQuestionDetailsSuccess(questionState, action) {
  return {
    ...questionState,
    questions: {
      ...questionState.questions,
      byId: {
        ...questionState.questions.byId,
        [action.data.id]: action.data
      },
      loading: {
        ...questionState.questions.loading,
        [action.data.id]: false
      }
    }
  };
}

function setIsLoadingQuestion(questionState, questionId, isFetching = true) {
  return updateObject(questionState, {
    questions: {
      ...questionState.questions,
      loading: {
        ...questionState.questions.loading,
        [questionId]: isFetching
      }
    }
  });
}

function addQuestionSuccess(questionState, action) {
  return {
    ...questionState,
    questions: {
      ...questionState.questions,
      byId: {
        ...questionState.questions.byId,
        [action.data.id]: action.data
      },
      allIds: [...questionState.questions.allIds, action.data.id]
    }
  };
}

export default createReducer(getInitState(), {
  [`${FETCH_QUESTIONS}_SUCCESS`]: fetchQuestionsSuccess,
  [`${FETCH_QUESTIONS}_REQUEST`]: questionState =>
    updateObject(questionState, { isFetching: true }),
  [`${FETCH_QUESTIONS}_FAILURE`]: questionState =>
    updateObject(questionState, { isFetching: false }),

  [`${DELETE_QUESTION}_REQUEST`]: (questionState, action) =>
    setIsLoadingQuestion(questionState, action.questionId),
  [`${DELETE_QUESTION}_FAILURE`]: (questionState, action) =>
    setIsLoadingQuestion(questionState, action.questionId, false),
  [`${DELETE_QUESTION}_SUCCESS`]: deleteQuestionSuccess,

  [`${FETCH_QUESTION}_REQUEST`]: (questionState, action) =>
    setIsLoadingQuestion(questionState, action.questionId),
  [`${FETCH_QUESTION}_FAILURE`]: (questionState, action) =>
    setIsLoadingQuestion(questionState, action.questionId, false),
  [`${FETCH_QUESTION}_SUCCESS`]: fetchQuestionDetailsSuccess,

  [`${ADD_QUESTION}_SUCCESS`]: addQuestionSuccess
});

export const getToken = state => state.auth.token;

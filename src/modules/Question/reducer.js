import {createReducer, updateObject} from 'utils/reducerUtils';
import filter from 'lodash/filter';

import { FETCH_QUESTIONS, DELETE_QUESTION } from './actionTypes';
import {FETCH_QUESTION} from "modules/Question/actionTypes";
import normalizeList from "utils/normalizeList";

function getInitState() {
  return {
    questions: [],
  };
}

function fetchQuestionsSuccess(questionState, action) {
  return {
    ...questionState,
    questions: normalizeList(action.data),
  }
}

function deleteQuestionSuccess(questionState, action) {
  return {
    ...questionState,
    questions: {
      ...questionState.questions,
      allIds: filter(questionState.questions.allIds, questionId => questionId !== action.questionId)
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
        isFetching: false,
      },
      loading: {
        ...questionState.questions.loading,
        [action.data.id]: false,
      }
    }
  }
}

function setIsLoadingQuestion(questionState, questionId, isFetching = true) {
  return updateObject(questionState,
    {
      questions: {
        ...questionState.questions,
        loading: {
          ...questionState.questions.isFetching,
          [questionId]: isFetching,
        }
      }
    }
  )
}

export default createReducer(getInitState(), {
  [`${FETCH_QUESTIONS}_SUCCESS`]: fetchQuestionsSuccess,
  [`${DELETE_QUESTION}_SUCCESS`]: deleteQuestionSuccess,
  [`${DELETE_QUESTION}_REQUEST`]: (questionState, action) =>
    setIsLoadingQuestion(questionState, action.questionId),
  [`${FETCH_QUESTION}_REQUEST`]: (questionState, action) =>
    setIsLoadingQuestion(questionState, action.questionId),
  [`${FETCH_QUESTION}_SUCCESS`]: fetchQuestionDetailsSuccess,
});

export const getToken = (state) => state.auth.token;
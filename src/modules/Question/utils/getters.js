import find from 'lodash/find';

export const getQuestionsIds = state => state.question.questions.allIds || [];
export const getQuestions = state => state.question.questions.byId || {};
export const getQuestion = (state, sectionId) => find(getQuestions(state), { id: sectionId });
export const getQuestionIsFetching = (state) => state.question.isFetching;

export const getQuestionsLoading = state => state.question.questions.loading || {};
export const getQuestionLoading = (state, questionId) =>
  getQuestionsLoading(state)[questionId] || false;

export const getQuestionIsLoading = (state, questionId) => state.question.questions.loading && state.question.questions.loading[questionId];

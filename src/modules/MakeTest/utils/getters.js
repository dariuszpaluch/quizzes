export const getQuestionsIds = (state) => state.makeTest.questions.allIds;
export const getQuestions = (state) => state.makeTest.questions.byId;
export const getTestDescription = (state) => state.makeTest.testData;
export const getIsFetching = (state) => state.makeTest.fetching;
export const getTestAnswers = (state) => state.makeTest.answers;
export const getQuestionRating = (state) => state.makeTest.questionRating;
export const getTestRating = (state) => state.makeTest.testRating;
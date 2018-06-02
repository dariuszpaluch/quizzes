export const getTestsIds = state => state.tests.testsList.allIds;
export const getTests = state => state.tests.testsList.byId;
export const getTest = (state, testId) => state.tests.testsList.byId[testId];

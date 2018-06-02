const paths = {
  INDEX: `${PUBLIC_PATH}`,
  DASHBOARD: `${PUBLIC_PATH}dashboard`,
  MAKE_TEST: `${PUBLIC_PATH}make-test/:testId`,
  QUESTIONS: `${PUBLIC_PATH}question`,
  TESTS: `${PUBLIC_PATH}tests`,
  SETTINGS: `${PUBLIC_PATH}settings`,
  TESTS_RESULTS: `${PUBLIC_PATH}test-result/:testResultId`
};

export const authPaths = {
  SIGN_IN: `sign-in`,
  SIGN_UP: `sign-up`
};

export const questionPaths = {
  ADD_QUESTION: `/add`,
  EDIT_QUESTION: `/:questionId/edit`
};

export const testsPaths = {
  TESTS: '/',
  TEST: '/:testId',
  TEST_ADD: '/add',
  SEARCH_TESTS: `/search-tests`
};

export default paths;

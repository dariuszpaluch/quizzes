import {defineMessages} from "react-intl";

const messages = defineMessages({
  TEST_NAME: {
    id:'test.input.name',
    defaultMessage: 'Name',
  },
  TEST_DESCRIPTION: {
    id: 'test.input.description',
    defaultMessage: 'Description',
  },
  TEST_HEADER_EDIT_MODE: {
    id: 'test.header.edit.mode',
    defaultMessage: 'Edition of the test',
  },
  TEST_HEADER_ADD_MODE: {
    id: 'test.header.add.mode',
    defaultMessage: 'Add test',
  },
  TEST_QUESTIONS: {
    id:'test.input.questions',
    defaultMessage: 'Questions',
  },
  TESTS_LIST_HEADER: {
    id: 'test.list.header',
    defaultMessage: 'Tests'
  },
  TEST_DETAIL_HEADER: {
    id: 'test.detail.header',
    defaultMessage: 'Test: {name}'
  },
  TEST_DETAIL_SHARE_TEST_BY_URL: {
    id: 'test.detail.share-test',
    defaultMessage: 'Share test by url'
  },
  TEST_URL_COPIED_TO_CLIPBOARD: {
    id: 'test-url-copied-to-clipboard',
    defaultMessage: 'Test url has been copied to the clipboard',
  },
  NO_TESTS_INFORMATION: {
    id: 'tests.no-tests',
    defaultMessage: 'No tests'
  },
  NO_MATCHING_TESTS_TO_QUERY: {
    id: 'tests.no-matching-test-to-query',
    defaultMessage: 'No matching tests to query: {query}'
  },
});

export default messages;

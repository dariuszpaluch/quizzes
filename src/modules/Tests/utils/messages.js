import {defineMessages} from "react-intl";

const messages = defineMessages({
  TEST_INPUT_NAME: {
    id:'test.input.name',
    defaultMessage: 'Name of the test',
  },
  TEST_INPUT_DESCRIPTION: {
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
  TEST_INPUT_QUESTIONS: {
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
  }
});

export default messages;
import {defineMessages} from "react-intl";

const messages = defineMessages({
  START_TEST_BUTTON: {
    id: 'make-test.start-test.button',
    defaultMessage: 'Start test',
  },
  NUMBER_OF_QUESTIONS: {
    id: 'make-test.numberOfQuestions',
    defaultMessage: 'Number of questions '
  },
  DESCRIPTION_TEST: {
    id: 'make-test.description-test',
    defaultMessage: 'Test description',
  },
  CREATED_TEST_DATE: {
    id: 'make-test.created-test',
    defaultMessage: 'Created'
  },
  QUESTION_STEPPER_LABEL : {
    id: 'make-test.question-stepper-label',
    defaultMessage: 'Question { step } of { numberOfQuestions}'
  },
  TEST_SUMMARY: {
    id: 'make-test.test-summary',
    defaultMessage: 'Test summary',
  },
  FINISH_TEST: {
    id: 'make-test.finish-test',
    defaultMessage: 'Finish test',
  },
  RETURN_TO_TEST: {
    id: 'make-test.return-to-test',
    defaultMessage: 'Return to test',
  },
  TEST_SAVE_SUCCESS_TOASTR: {
    id: 'make-test.test-save-success',
    defaultMessage: 'Test saved success'
  },
  TEST_SAVE_FAILURE_TOASTR: {
    id: 'make-test.test-save-failure',
    defaultMessage: 'Test save failure',
  }
});

export default messages;
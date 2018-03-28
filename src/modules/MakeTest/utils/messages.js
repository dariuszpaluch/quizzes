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
  }
});

export default messages;
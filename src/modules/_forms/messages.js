import {defineMessages} from "react-intl";

const messages = defineMessages({
  VALIDATION_INPUT_REQUIRED: {
    id: 'forms.input-is-required',
    defaultMessage: 'This field is required',
  },
  VALIDATION_INPUT_MAX_LENGTH: {
    id: 'forms.input-max-length',
    defaultMessage: `Must be {max} characters or less`,
  },
});

export default messages;

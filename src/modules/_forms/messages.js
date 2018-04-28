import { defineMessages } from 'react-intl';

const messages = defineMessages({
  VALIDATION_INPUT_REQUIRED: {
    id: 'forms.input-is-required',
    defaultMessage: 'This field is required'
  },
  VALIDATION_INPUT_MAX_LENGTH: {
    id: 'forms.input-max-length',
    defaultMessage: `Must be {max} characters or less`
  },
  VALIDATION_INPUT_MIN_LENGTH: {
    id: 'forms.input-min-length',
    defaultMessage: `Must be {min} characters or more`
  },
  VALIDATION_INPUT_NUMBER: {
    id: 'forms.input-is-number',
    defaultMessage: 'Must be a number'
  },
  VALIDATION_INPUT_MIN_VALUE: {
    id: 'forms.input-min-value',
    defaultMessage: 'Must be at least {min}'
  },
  VALIDATION_INPUT_EMAIL: {
    id: 'forms.input-email',
    defaultMessage: 'Invalid email address'
  },
  VALIDATION_INPUT_ALPHANUMERIC: {
    id: 'forms.input-alphanumeric',
    defaultMessage: 'Only alphanumeric characters'
  },
  VALIDATION_ARRAY_MIN_SIZE: {
    id: 'forms.array-min-size',
    defaultMessage: 'Must be {min} items'
  }
});

export default messages;

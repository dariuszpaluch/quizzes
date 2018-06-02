import size from 'lodash/size';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';

import messages from 'modules/_forms/messages';

export const required = value => (value ? undefined : messages.VALIDATION_INPUT_REQUIRED);

export const maxLength = max => value =>
  value && value.length > max
    ? {
        message: messages.VALIDATION_INPUT_MIN_LENGTH,
        values: {
          min
        }
      }
    : undefined;

export const minLength = min => value =>
  value && value.length < min
    ? {
        message: messages.VALIDATION_INPUT_MIN_LENGTH,
        values: {
          min
        }
      }
    : undefined;

export const number = value =>
  value && isNaN(Number(value)) ? messages.VALIDATION_INPUT_NUMBER : undefined;

export const minValue = min => value =>
  value && value < min ? messages.VALIDATION_INPUT_MIN_VALUE : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? messages.VALIDATION_INPUT_EMAIL
    : undefined;

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? messages.VALIDATION_INPUT_ALPHANUMERIC : undefined;

export const arrayMinSize = (min, validItem) => value => {
  let items = value;
  if (validItem) items = filter(items, validItem);

  return size(items) < min
    ? { message: messages.VALIDATION_ARRAY_MIN_SIZE, values: { min } }
    : undefined;
};

// export const phoneNumber = value =>
//   value && !/^(0|[1-9][0-9]{9})$/i.test(value)
//     ? 'Invalid phone number, must be 10 digits'
//     : undefined;

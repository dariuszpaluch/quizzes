import isArray from 'lodash/isArray';

const intlWrapValidationItem = (intl, validationFunc) => (...args) => {
  const resultMessage = validationFunc(...args);

  if (!resultMessage) return resultMessage;

  if (resultMessage.message) {
    return intl.formatMessage(resultMessage.message, resultMessage.values);
  }

  if (resultMessage.id) {
    return intl.formatMessage(resultMessage);
  }

  return resultMessage;
};

const intlWrapValidationsArray = (intl, validationFuns = []) => {
  return validationFuns.map(func => intlWrapValidationItem(intl, func));
};

export default function intlWrapValidation(intl, validation) {
  return isArray(validation)
    ? intlWrapValidationsArray(intl, validation)
    : intlWrapValidationItem(intl, validation);
}

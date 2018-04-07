import isArray from 'lodash/isArray';

const intlWrapValidation = (intl, validationFunc) => (...args) => {
  const resultMessage = validationFunc(...args);

  if(resultMessage && resultMessage.id) {
    return intl.formatMessage(resultMessage)
  }

  return undefined;
};

const intlWrapValidationsArray = (intl, validationFuns = []) => {
  return validationFuns.map(func => intlWrapValidation(intl, func));
};

export default function(intl, validation) {
  return isArray(validation) ?
    intlWrapValidationsArray(intl, validation)
    : intlWrapValidation(intl, validation)
}


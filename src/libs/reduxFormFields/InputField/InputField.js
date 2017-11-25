import React from 'react';
import PropTypes from 'prop-types'

import classnames from 'classnames';
import {Field} from 'redux-form';
import Input from 'libs/ui/Input/Input';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

const renderInput = ({input, meta, ...restProps}) => {

  return (
    <Input
      {...input}
      {...restProps}
    />
  )
};

const InputField = ({...props}) => {

  return (
    <Field
      {...props}
      component={renderInput}
    />
  )
};

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;

export default InputField;


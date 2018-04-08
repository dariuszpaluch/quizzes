import React from 'react';
import PropTypes from 'prop-types'

import {FieldArray} from 'redux-form';
import InputField from "libs/reduxFormFields/InputField";
import Button from "../../../libs/ui/Button/Button";  // ES6

import STRINGS  from '../utils/strings';
import IconButton from "../../../libs/ui/IconButton/IconButton";
const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

const renderItems = ({fields, meta: {error, submitFailed}}) => {
  return (
    <ul>
      {fields.map((name, index) => {
        return (
          <li key={index}>
            <InputField
              name={`${name}.label`}
              label={`${STRINGS.INPUTS.ANSWER} ${index + 1}`}
            />
            <IconButton
              icon="clear"
              onClick={() => fields.remove(index)}
            />
          </li>
        );
      })}
      <Button
        onClick={() => fields.push({
          label: '',
          id: '',
          correct: false,
        })}
      >{STRINGS.BUTTONS.ADD_ANSWER}</Button>
    </ul>
  );
};

const AnswersForm = ({...props}) => {

  return (
    <div>
      <FieldArray
        {...props}
        component={renderItems}
      />
      <Button>Add answer</Button>
    </div>
  )
};

AnswersForm.propTypes = propTypes;
AnswersForm.defaultProps = defaultProps;

export default AnswersForm;


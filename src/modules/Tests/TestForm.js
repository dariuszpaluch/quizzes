import './tests.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import values from 'lodash/values';
import pick from 'lodash/pick';

import InputField from 'libs/reduxFormFields/InputField/InputField';
import { required, minLength } from 'utils/validations';
const quizNameMinLength = minLength(10);
import Button from 'libs/ui/Button/Button';
import Card from 'libs/ui/Card/Card';
import messages from './messages';
import {injectIntl} from 'react-intl'
import globalMessages from "utils/globalMessages";

const MODES = {
  EDIT: 'EDIT',
  ADD: 'ADD',
};

class TestForm extends Component {
  static modes = MODES;

  static propTypes = {
    mode: PropTypes.oneOf(values(MODES))
  };

  static defaultProps = {
    mode: MODES.ADD,
  };

  onSubmit = () => {

  };

  render() {
    const {
      handleSubmit,
      intl,
      mode
    } = this.props;

    return (
      <Card
        className="tests-form"
        title={intl.formatMessage(mode === MODES.ADD ? messages.TEST_HEADER_ADD_MODE : messages.TEST_HEADER_EDIT_MODE)}
      >
        <form className="test-form" onSubmit={handleSubmit(this.onSubmit)}>
          <InputField
            name='name'
            label={intl.formatMessage(messages.TEST_INPUT_NAME)}
            validate={[required, quizNameMinLength]}
          />
          <InputField
            name='description'
            label={intl.formatMessage(messages.TEST_INPUT_DESCRIPTION)}
          />
          <Button
            type="submit"
          >{intl.formatMessage(globalMessages.SAVE)}</Button>
        </form>
      </Card>
    );
  }


}

const FORM_NAME = 'TestForm';

TestForm = reduxForm({
  form: FORM_NAME,
  initialValues: {
    name: '',
    description: '',
  },
})(TestForm);

const mapStateToProps = (state, ownProps ) => {
  return {
  };
};

const mapDispatchToProps = {
  // onSubmit: addQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TestForm));

import './tests.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, getFormValues, reduxForm, getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';

import values from 'lodash/values';

import InputField from 'libs/reduxFormFields/InputField/InputField';
import { required, minLength } from 'utils/validations';

import Button from 'libs/ui/Button/Button';
import Card from 'libs/ui/Card/Card';
import messages from './messages';
import { injectIntl } from 'react-intl'
import globalMessages from 'utils/globalMessages';
import QuestionList from 'modules/Question/QuestionList';
import Typography from 'libs/ui/Typography';

import { addTest } from 'modules/Tests/actions';  // ES6

const MODES = {
  EDIT: 'EDIT',
  ADD: 'ADD',
};

const quizNameMinLength = minLength(5);

class TestForm extends Component {
  static modes = MODES;

  static propTypes = {
    mode: PropTypes.oneOf(values(MODES))
  };

  static defaultProps = {
    mode: MODES.ADD,
  };

  onSubmit = (values) => {
    this.props.onSubmit(values);
  };

  renderQuestionsList = ({
                           input: { value, onChange },
                           meta: { touched, error, warning },
                           selectedIds,
                           label
                         }) => {
    return (
      <div>
        <Typography variant="display1">{label}</Typography>
        <QuestionList
          selectedIds={value}
          onChangeSelect={onChange}
        />
      </div>

    );
  };

  render() {
    const {
      handleSubmit,
      intl,
      mode,
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
          <Field
            name='questionsIds'
            component={this.renderQuestionsList}
            label={intl.formatMessage(messages.TEST_INPUT_QUESTIONS)}
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
    questionsIds: [],
  },
})(TestForm);

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = {
  onSubmit: addTest
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TestForm));

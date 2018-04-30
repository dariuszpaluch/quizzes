import './sign_up.scss';
import '../style.scss';

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import forEach from 'lodash/forEach';

import InputField from 'libs/reduxFormFields/InputField/InputField';
import Button from 'libs/ui/Button/Button';

import validate, { minPasswordLength } from './signUpValidation';
import { signUp } from 'modules/Auth/actions';
import { connect } from 'react-redux';
import { email, required } from 'modules/_forms/validations';
import messages from 'modules/Auth/utils/messages';
import { injectIntl } from 'react-intl';
import intlWrapValidation from 'modules/_forms/intlWrapValidation';

class SignUpForm extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const { intl } = props;

    this.validations = {};
    forEach(
      {
        login: required,
        firstName: required,
        surname: required,
        email: [required, email],
        password: [required, minPasswordLength]
      },
      (inputValidations, inputKey) => {
        this.validations[inputKey] = intlWrapValidation(intl, inputValidations);
      }
    );
  }

  onSubmit = values => {
    const { login, firstName, surname, email, password } = values;
    this.props.signUp({ login, password, firstName, surname, email });
  };

  render() {
    const { handleSubmit, intl } = this.props;

    return (
      <form className="sign-up-form" onSubmit={handleSubmit(this.onSubmit)}>
        <InputField
          name="login"
          label={intl.formatMessage(messages.LOGIN)}
          validate={this.validations.login}
        />
        <InputField
          name="firstName"
          label={intl.formatMessage(messages.FIRST_NAME)}
          validate={this.validations.firstName}
        />
        <InputField
          name="surname"
          label={intl.formatMessage(messages.SURNAME)}
          validate={this.validations.surname}
        />
        <InputField
          name="email"
          label={intl.formatMessage(messages.EMAIL)}
          type="email"
          validate={this.validations.email}
        />
        <InputField
          name="password"
          label={intl.formatMessage(messages.PASSWORD)}
          type="password"
          validate={this.validations.password}
        />
        <InputField
          name="repeatPassword"
          label={intl.formatMessage(messages.REPEAT_PASSWORD)}
          type="password"
          validate={this.validations.password}
        />
        <Button
          variant="raised"
          type="submit"
          color="primary"
          className="submit-button"
        >
          {intl.formatMessage(messages.SIGN_UP)}
        </Button>
      </form>
    );
  }
}

const FORM_NAME = 'signUp';

SignUpForm = reduxForm({
  form: FORM_NAME,
  validate
})(SignUpForm);

const mapDispatchToProps = {
  signUp
};

export default connect(null, mapDispatchToProps)(injectIntl(SignUpForm));

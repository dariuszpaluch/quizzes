import './sign_up.scss';
import '../style.scss';

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import InputField from 'libs/reduxFormFields/InputField/InputField';
import Button from 'libs/ui/Button/Button';

import validate from './signUpValidation';
import {signUp} from 'modules/Auth/actions';
import {connect} from 'react-redux';
import { email, required} from 'modules/_forms/validations';
import { minPasswordLength } from './signUpValidation';
import messages from 'modules/Auth/utils/messages';
import { injectIntl } from 'react-intl';

class SignUpForm extends Component {
  static propTypes = {};

  static defaultProps = {};

  onSubmit = (values) => {
    const {login, firstName, surname, email, password} = values;
    this.props.signUp({login, password, firstName, surname, email});
  };

  render() {
    const {
      handleSubmit,
      intl,
    } = this.props;

    return (
      <form className="sign-up-form" onSubmit={handleSubmit(this.onSubmit)}>
        <InputField
          name="login"
          label={intl.formatMessage(messages.LOGIN)}
          validate={[required]}
        />
        <InputField
          name="firstName"
          label={intl.formatMessage(messages.FIRST_NAME)}
        />
        <InputField
          name="surname"
          label={intl.formatMessage(messages.SURNAME)}
        />
        <InputField
          name="email"
          label={intl.formatMessage(messages.EMAIL)}
          type="email"
          validate={[required, email]}

        />
        <InputField
          name="password"
          label={intl.formatMessage(messages.PASSWORD)}
          type="password"
          validate={[required, minPasswordLength]}
        />
        <InputField
          name="repeatPassword"
          label={intl.formatMessage(messages.REPEAT_PASSWORD)}
          type="password"
          validate={[required, minPasswordLength]}
        />
        <Button
          variant="raised"
          type="submit"
          color="primary"
          className="submit-button"
        >{intl.formatMessage(messages.SIGN_UP)}</Button>
      </form>
    );
  }
}

const FORM_NAME = 'signUp';

SignUpForm = reduxForm({
  form: FORM_NAME,
  validate,
})(SignUpForm);

const mapDispatchToProps = {
  signUp,
};

export default connect(null, mapDispatchToProps)(injectIntl(SignUpForm));

import './sign_up.scss';
import '../style.scss';

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import InputField from 'libs/reduxFormFields/InputField/InputField';
import Button from 'libs/ui/Button/Button';

import validate from './signUpValidation';
import {signUp} from 'modules/Auth/actions';
import {connect} from 'react-redux';
import { email, required} from 'utils/validations';
import { minPasswordLength } from './signUpValidation';

class SignUpForm extends Component {
  static propTypes = {};

  static defaultProps = {};

  onSubmit = (values) => {
    const {login, firstName, surname, email, password} = values;
    this.props.signUp({login, password, firstName, surname, email});
  };

  render() {
    const {
      handleSubmit
    } = this.props;

    return (
      <form className="sign-up-form" onSubmit={handleSubmit(this.onSubmit)}>
        <InputField
          name="login"
          label="Login"
          validate={[required]}
        />
        <InputField
          name="firstName"
          label="FirstName"
        />
        <InputField
          name="surname"
          label="Surname"
        />
        <InputField
          name="email"
          label="E-mail"
          type="email"
          validate={[required, email]}

        />
        <InputField
          name="password"
          label="Password"
          type="password"
          validate={[required, minPasswordLength]}
        />
        <InputField
          name="repeatPassword"
          label="Repeat password"
          type="password"
          validate={[required, minPasswordLength]}
        />
        <Button
          raised
          type="submit"
          color="primary"
          className="submit-button"
        >SignUp</Button>
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

export default connect(null, mapDispatchToProps)(SignUpForm);

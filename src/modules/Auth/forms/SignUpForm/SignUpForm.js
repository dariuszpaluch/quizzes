import './sign_up.scss';
import '../style.scss';

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import InputField from 'libs/reduxFormFields/InputField/InputField';
import Button from 'libs/ui/Button/Button';

import validate from './signUpValidation';
import {signIn, signUp} from 'modules/Auth/actions';
import {connect} from 'react-redux';

class SignUpForm extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  onSubmit = (values) => {
    console.log("123", values);

    const {name, surname, email, password, repeatPassword} = values;
    this.props.signUp({login: email, password});
  };

  render() {
    const {
      handleSubmit
    } = this.props;

    return (
      <form className="sign-up-form" onSubmit={handleSubmit(this.onSubmit)}>
        <InputField
          name="name"
          label="Name"
        />
        <InputField
          name="surname"
          label="Surname"
        />
        <InputField
          name="email"
          label="E-mail"
          type="email"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
        />
        <InputField
          name="repeatPassword"
          label="Repeat password"
          type="password"
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

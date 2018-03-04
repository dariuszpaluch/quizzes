import './sign_in.scss';
import '../style.scss';

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import InputField from 'libs/reduxFormFields/InputField/InputField';
import Button from 'libs/ui/Button/Button';

import validate from './signInValidation';

import {signIn} from '../../actions';
import {connect} from 'react-redux';

class SignInForm extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      onSubmit,
      handleSubmit
    } = this.props;

    return (
      <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="login"
          label="E-mail"
          className="login-input"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          className="password-input"
        />
        <Button
          raised
          type="submit"
          color="primary"
          className="submit-button"
        >SignIn</Button>
      </form>
    );
  }
}

const FORM_NAME = 'signIn';

SignInForm = reduxForm({
  form: FORM_NAME,
  validate,
})(SignInForm);

const mapDispatchToProps = {
  onSubmit: signIn,
};

export default connect(null, mapDispatchToProps)(SignInForm);

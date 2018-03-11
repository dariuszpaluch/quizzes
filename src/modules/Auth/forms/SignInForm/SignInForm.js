import './sign_in.scss';
import '../style.scss';

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import InputField from 'libs/reduxFormFields/InputField/InputField';
import Button from 'libs/ui/Button/Button';

import validate from './signInValidation';

import {signIn} from '../../actions';
import {connect} from 'react-redux';
import { required } from 'utils/validations';
import {toastr} from 'react-redux-toastr'

import {SIGN_IN as STRINGS} from '../../strings'

class SignInForm extends Component {
  static propTypes = {};

  static defaultProps = {};

  signIn = (values) => {
      this.props.signIn(values, this.onSignInSuccess, this.onSignInFailure);
  };

  onSignInSuccess = () => {
    toastr.success(STRINGS.TITLE, 'Zostałeś zalogowany'); //TODO change to push history
  };

  onSignInFailure = () => {
    toastr.error(STRINGS.TITLE, STRINGS.SIGN_IN_FAILURE);
  };

  render() {
    const {
      handleSubmit
    } = this.props;

    return (
      <form className="sign-in-form" onSubmit={handleSubmit(this.signIn)}>
        <InputField
          className="login-input"
          name="login"
          label="Login"
          validate={[required]}
        />
        <InputField
          className="password-input"
          name="password"
          label="Password"
          type="password"
          validate={[required]}
        />
        <Button
          variant="raised"
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
  signIn,
};

export default connect(null, mapDispatchToProps)(SignInForm);

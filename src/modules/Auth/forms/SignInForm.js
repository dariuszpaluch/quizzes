import './sign_in.scss';

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import InputField from 'libs/reduxFormFields/InputField/InputField';
import Button from 'libs/ui/Button/Button';
import Card from 'libs/ui/Card/Card';

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
      <Card
        className="sign-in-form"
        title="Sign in">
        <form onSubmit={ handleSubmit(onSubmit) }>
          <InputField
            name="login"
            label="login"
            className="login-input"
          />
          <InputField
            name="password"
            label="password"
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
      </Card>
    );
  }
}

const FORM_NAME = 'signIn';

export default reduxForm({
  form: FORM_NAME,
})(SignInForm);

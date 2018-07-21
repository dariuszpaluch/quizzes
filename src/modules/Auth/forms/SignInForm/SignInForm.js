import './sign_in.scss';
import '../style.scss';

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import InputField from 'libs/reduxFormFields/InputField/InputField';
import Button from 'libs/ui/Button/Button';

import validate from './signInValidation';

import { signIn } from '../../actions';
import { connect } from 'react-redux';
import { required } from 'modules/_forms/validations';
import { toastr } from 'react-redux-toastr';

import { SIGN_IN as STRINGS } from '../../strings';
import { injectIntl } from 'react-intl';
import messages, { toastrMessages } from 'modules/Auth/utils/messages';
import intlWrapValidation from 'modules/_forms/intlWrapValidation';
import { withRouter } from 'react-router-dom';
import paths from 'consts/paths';
import SocialMediaLoginButtons from 'modules/Auth/components/SocialMediaLoginButtons';

class SignInForm extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.requiredValidation = intlWrapValidation(props.intl, required);
  }

  signIn = values => {
    this.props.signIn(values, null, this.onSignInFailure);
  };

  onSignInFailure = () => {
    toastr.error(STRINGS.TITLE, STRINGS.SIGN_IN_FAILURE);
  };

  render() {
    const { handleSubmit, intl, location } = this.props;

    return (
      <form className="sign-in-form" onSubmit={handleSubmit(this.signIn)}>
        <InputField
          className="login-input"
          name="login"
          label={intl.formatMessage(messages.LOGIN)}
          validate={this.requiredValidation}
        />
        <InputField
          className="password-input"
          name="password"
          label={intl.formatMessage(messages.PASSWORD)}
          type="password"
          validate={this.requiredValidation}
        />
        <Button variant="raised" type="submit" color="primary" className="submit-button">
          {intl.formatMessage(messages.SIGN_IN)}
        </Button>
        <SocialMediaLoginButtons />
      </form>
    );
  }
}

const FORM_NAME = 'signIn';

SignInForm = reduxForm({
  form: FORM_NAME,
  validate
})(SignInForm);

const mapDispatchToProps = {
  signIn
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(injectIntl(SignInForm)));

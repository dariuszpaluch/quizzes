import { defineMessages } from 'react-intl';

const toastrMessages = defineMessages({
  TOASTR_SIGN_IN_SUCCESS: {
    id: 'toastr.sign-in-success',
    defaultMessage: 'Sign in success'
  },
  SIGN_UP_SUCCESS: {
    id: 'toastr.sign-up-success-toastr',
    defaultMessage: 'Account created. Now you can log-in.'
  },
  SIGN_UP_FAILURE: {
    id: 'toastr.sign-up-toastr-failure',
    defaultMessage: 'Some error in registration. Please try again later.'
  }
});

export default toastrMessages;

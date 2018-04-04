import {defineMessages} from "react-intl";

const messages = defineMessages({
  SIGN_IN: {
    id: 'sign-in',
    defaultMessage: 'Sign in',
  },
  SIGN_UP: {
    id: 'sign-up',
    defaultMessage: 'Sign up'
  },
  LOGIN: {
    id: 'login',
    defaultMessage: 'Login',
  },
  PASSWORD: {
    id: 'password',
    defaultMessage : 'Password',
  },
  REPEAT_PASSWORD: {
    id: 'repeat-password',
    defaultMessage: 'Repeat password',
  },
  FIRST_NAME: {
    id: 'first-name',
    defaultMessage: 'First name',
  },
  SURNAME: {
    id: 'surname',
    defaultMessage: 'Surname',
  },
  EMAIL: {
    id: 'email',
    defaultMessage: 'E-mail',
  },
});

export const toastrMessages = defineMessages({
  TOASTR_SIGN_IN_SUCCESS: {
    id: 'toastr.sign-in-success',
    defaultMessage: 'Sign in success',
  },
});
export default messages;


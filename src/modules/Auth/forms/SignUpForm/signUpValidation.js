import { minLength } from 'utils/validations';

const MIN_PASSWORD_LENGTH = 8;
export default function validation(values) {
  const errors = {};

  // if (!values.login) {
  //   errors.login = 'Email is required'
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)) {
  //   errors.login = 'Invalid email address'
  // }
  //
  // if (!values.password) {
  //   errors.password = 'Password is required'
  // }
  if(values.password !== values.repeatPassword) {
    errors.repeatPassword = 'The repeated password is not identical to the password';
  }

  return errors
}

export const minPasswordLength = minLength(MIN_PASSWORD_LENGTH);
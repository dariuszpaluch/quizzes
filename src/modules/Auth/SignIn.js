import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';
import SignInForm from './forms/SignInForm';
import {signIn} from './actions';

class SignIn extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  trySignIn = (values) => {
    console.log(values);

    return this.props.signIn(values);
  };

  render() {
    return(
      <SignInForm
        onSubmit={ this.trySignIn }
      />
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//   }
// };

const mapDispatchToProps = {
  signIn,
};

export default connect(null, mapDispatchToProps)(SignIn);
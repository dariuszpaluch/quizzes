import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, withRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'


import Tabs from 'libs/ui/Tabs';
import Card from 'libs/ui/Card/Card';

import {signIn} from './actions';

import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';


class Auth extends Component {
  static propTypes = {};

  static defaultProps = {};

  static tabs = [
    {
      label: 'Sign in',
      value: '/sign-in',
      path: '/sign-in'
    },
    {
      label: 'Sign up',
      value: '/sign-up',
      path: '/sign-up'
    }
  ];

  constructor(props) {
    super(props);

    this.state = {};
  }

  onChangeTab = (selectedOption) => {
    if (selectedOption && selectedOption.path)
      this.props.history.push(selectedOption.path)
  };

  render() {
    const {
      match
    } = this.props;

    return (
      <Card
        className="sign-in-form">
        <span>darek</span>

        <Tabs
          tabs={Auth.tabs}
          value={this.props.location.pathname}
          onChange={this.onChangeTab}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        />
        <Switch>

          <Route
            path={`${ match.url}sign-up`}
            component={SignUpForm}
          />
          <Route
            path={`${ match.url}`}
            component={SignInForm}
          />
        </Switch>
      </Card>
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

export default connect(null, mapDispatchToProps)(withRouter(Auth));
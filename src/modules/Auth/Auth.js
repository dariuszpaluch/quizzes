import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, withRouter } from 'react-router-dom'


import Tabs from 'libs/ui/Tabs';
import Card from 'libs/ui/Card/Card';

import { signIn } from './actions';

import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';
import MainLayout from 'modules/MainLayout/MainLayout';
import { injectIntl } from 'react-intl';
import messages from 'modules/Auth/utils/messages';
import classnames from 'classnames';


class Auth extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};

    this.tabs = [
      {
        label: props.intl.formatMessage(messages.SIGN_IN),
        value: '/sign-in',
        path: '/sign-in'
      },
      {
        label: props.intl.formatMessage(messages.SIGN_UP),
        value: '/sign-up',
        path: '/sign-up'
      }
    ];

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
      <MainLayout hideMenu>
        <div className={classnames('auth','row')}  style={{ width: '100%' }}>
          <div className="col-xs-12">
            <Card>
              <Tabs
                tabs={this.tabs}
                value={this.props.location.pathname}
                onChange={this.onChangeTab}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              />
              <Switch>
                <Route
                  exact
                  path={`${ match.url}sign-up`}
                  component={SignUpForm}
                />
                <Route
                  exact
                  path={`${ match.url}`}
                  component={SignInForm}
                />
                <Route
                  exact
                  path={`${ match.url}sign-in`}
                  component={SignInForm}
                />
              </Switch>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }
}

const mapDispatchToProps = {
  signIn,
};

export default connect(null, mapDispatchToProps)(withRouter(injectIntl(Auth)));
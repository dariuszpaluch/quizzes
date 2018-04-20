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
import { authPaths } from 'consts/paths';

class Auth extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};

    const { match } = props;

    this.tabs = [
      {
        label: props.intl.formatMessage(messages.SIGN_IN),
        value: [match.url, `${match.url}${authPaths.SIGN_IN}`],
        path: `${match.url}${authPaths.SIGN_IN}`,
      },
      {
        label: props.intl.formatMessage(messages.SIGN_UP),
        value: `${match.url}${authPaths.SIGN_UP}`,
        path: `${match.url}${authPaths.SIGN_UP}`,
      }
    ];

  }

  onChangeTab = (selectedOption) => {
    if (selectedOption && selectedOption.path)
      this.props.history.push(selectedOption.path)
  };

  render() {
    const {
      match,
      location
    } = this.props;

    return (
      <MainLayout hideMenu>
        <div className={classnames('auth','row')}>
          <div className="col-xs-12">
            <Card>
              <Tabs
                tabs={this.tabs}
                value={location.pathname}
                onChange={this.onChangeTab}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              />
              <Switch>
                <Route
                  exact
                  path={match.url}
                  component={SignInForm}
                />
                <Route
                  exact
                  path={`${match.url}${authPaths.SIGN_IN}`}
                  component={SignInForm}
                />
                <Route
                  exact
                  path={`${match.url}${authPaths.SIGN_UP}`}
                  component={SignUpForm}
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
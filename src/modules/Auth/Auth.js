import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, withRouter } from 'react-router-dom';

import Tabs from 'libs/ui/Tabs';
import Card from 'libs/ui/Card/Card';

import { signIn, signInByQuerytoken } from './actions';

import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';
import MainLayout from 'modules/MainLayout/MainLayout';
import { injectIntl } from 'react-intl';
import messages from 'modules/Auth/utils/messages';
import classnames from 'classnames';
import { authPaths } from 'consts/paths';
import paths from 'consts/paths';

import { parseQuery } from 'utils/routerHistory';
import Rocket from 'components/Rocket/Rocket';
import Logo from 'components/Logo/Logo';
import Meteors from 'components/Meteors/Meteors';

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
        path: `${match.url}${authPaths.SIGN_IN}`
      },
      {
        label: props.intl.formatMessage(messages.SIGN_UP),
        value: `${match.url}${authPaths.SIGN_UP}`,
        path: `${match.url}${authPaths.SIGN_UP}`
      }
    ];
  }

  componentDidMount() {
    const { history, location } = this.props;
    const query = parseQuery(location.search);

    if (query.token) {
      this.props.signInByQuerytoken(query.token);
      history.push(paths.DASHBOARD);
    }
  }

  onChangeTab = selectedOption => {
    if (selectedOption && selectedOption.path) this.props.history.push(selectedOption.path);
  };

  render() {
    const { match, location } = this.props;

    return (
      <div className="auth-wrapper">
        <div>
          <div className="rocket-wrapper">
            <Rocket />
            <Logo />
            <Meteors fullScreen />
          </div>
          <Card className="auth">
            <Tabs
              className="auth-tabs"
              tabs={this.tabs}
              value={location.pathname}
              onChange={this.onChangeTab}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            />
            <Switch>
              <Route exact path={match.url} component={SignInForm} />
              <Route exact path={`${match.url}${authPaths.SIGN_IN}`} component={SignInForm} />
              <Route exact path={`${match.url}${authPaths.SIGN_UP}`} component={SignUpForm} />
            </Switch>
          </Card>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  signIn,
  signInByQuerytoken
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(injectIntl(Auth)));

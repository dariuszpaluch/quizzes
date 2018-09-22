import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Route, Switch, withRouter } from 'react-router-dom';

import Tabs from 'libs/ui/Tabs';
import Card from 'libs/ui/Card/Card';

import { injectIntl } from 'react-intl';
import messages from 'modules/Auth/utils/messages';
import paths, { authPaths } from 'consts/paths';

import SignInForm from './forms/SignInForm';

import { parseQuery } from 'utils/routerHistory';
import Rocket from 'components/Rocket/Rocket';
import Logo from 'components/Logo/Logo';
import Meteors from 'components/Meteors/Meteors';

import { signInByQuerytoken } from './actions';

import SignUpForm from './forms/SignUpForm';
import Tab from '@material-ui/core/Tab/Tab';

class Auth extends Component {
  static propTypes = {
    signInByQuerytoken: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const { match, intl } = props;

    console.log(match.url, authPaths.SIGN_IN);

    this.tabs = [
      {
        label: intl.formatMessage(messages.SIGN_IN),
        value: [match.url, `${match.url}${authPaths.SIGN_IN}`],
        path: `${match.url}${authPaths.SIGN_IN}`
      },
      {
        label: intl.formatMessage(messages.SIGN_UP),
        value: `${match.url}${authPaths.SIGN_UP}`,
        path: `${match.url}${authPaths.SIGN_UP}`
      }
    ];
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
                tabs={this.tabs}
                value={location.pathname}
                onChange={this.onChangeTab}
                fullWidth
              />

              <Switch>
                <Route path={`${match.url}${authPaths.SIGN_UP}`} component={SignUpForm} />
                <Route path={`${match.url}${authPaths.SIGN_IN}`} component={SignInForm} />
                <Route path={match.url} component={SignInForm} />
              </Switch>
          </Card>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  signInByQuerytoken
};

export default connect(null, mapDispatchToProps)(withRouter(injectIntl(Auth)));

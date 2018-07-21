import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';

import { Route, Switch, Router, withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import AppContainer from 'containers/AppContainer';
import Auth from 'modules/Auth';
import Question from 'modules/Question/Question';
import Tests from 'modules/Tests';
import Dashboard from 'modules/Dashboard/Dashboard';

import paths from 'consts/paths';

import MakeTest from 'modules/MakeTest/MakeTest';
import TestResult from 'modules/MakeTest/TestResult';

import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';
import { addLocaleData, IntlProvider } from 'react-intl';

import SmartMainLayout from 'modules/MainLayout/SmartMainLayout';
import store from './store';
import openWebSocket from './webSocket/webSocket';

import localeData from '../locales/data.json';
import { getToken } from 'modules/Auth/reducer';
import LocalStorageSource from 'sources/LocalStorageSource';
import { parseQuery } from 'utils/routerHistory';
import { signInByQuerytoken } from 'modules/Auth/actions';
import { logout } from 'modules/Auth/actions';

class RootAppComponent extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    window.addEventListener('storage', this.onChangeLocalStorage);

    const { history, location } = this.props;
    const query = parseQuery(location.search);
    const localStorageToken = LocalStorageSource.getToken();

    const token = query.token || localStorageToken;

    if (token) {
      this.props.signInByQuerytoken(token);
      history.push(location.pathname)
    }
  }

  onChangeLocalStorage = () => {
    const token = LocalStorageSource.getToken();
    if (!!token && (!this.props.token || token !== this.props.token)) {
      this.props.signInByQuerytoken(token);
    }

    if (!token) {
      this.props.logout();
    }
  };

  renderAuthenticatedContent() {
    return (
      <SmartMainLayout>
        <Switch>
          <Route path={paths.MAKE_TEST} component={MakeTest} />
          <Route path={paths.TESTS_RESULTS} component={TestResult} />
          <Route path={paths.TESTS} component={Tests} />
          <Route path={paths.QUESTIONS} component={Question} />
          <Route path={paths.INDEX} component={Dashboard} />
        </Switch>
      </SmartMainLayout>
    );
  }

  render() {
    const { token } = this.props;

    if (!!token) {
      return this.renderAuthenticatedContent();
    }

    return <Route path={paths.INDEX} component={Auth} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: getToken(state)
  };
};

const mapDispatchToProps = {
  signInByQuerytoken,
  logout
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RootAppComponent)
);

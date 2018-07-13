import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
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
import RootAppComponent from 'src/RootAppComponent';

addLocaleData([...en, ...pl]);
const history = createHistory();

// openWebSocket(store, history);

const AppComponent = () => {
  const language =
    (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
  const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

  return (
    <IntlProvider locale={language} messages={messages}>
      <Provider store={store}>
        <Router history={history}>
          <AppContainer>
            <RootAppComponent />
          </AppContainer>
        </Router>
      </Provider>
    </IntlProvider>
  );
};

export default AppComponent;
export const AppWithHot = hot(module)(AppComponent);

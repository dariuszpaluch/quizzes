import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppContainer from 'containers/AppContainer';
import Auth from 'modules/Auth';
import Question from 'modules/Question/Question';
import Tests from 'modules/Tests';
import Dashboard from 'modules/Dashboard/Dashboard';

import paths from 'consts/paths';

import TestResult from 'modules/MakeTest/TestResult';
import MakeTest from 'modules/MakeTest/MakeTest';

import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

import { addLocaleData, IntlProvider } from 'react-intl';

import SmartMainLayout from 'modules/MainLayout/SmartMainLayout';

import store from './store/store';


import localeData from '../locales/data.json';

addLocaleData([...en, ...pl]);

export default () => {
  const language =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
  const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

  return (
    <IntlProvider locale={language} messages={messages}>
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer>
            <SmartMainLayout>
              <Switch>
                <Route path={paths.DASHBOARD} component={Dashboard} />
                <Route path={paths.MAKE_TEST} component={MakeTest} />
                <Route path={paths.TESTS_RESULTS} component={TestResult} />
                <Route path={paths.TESTS} component={Tests} />
                <Route path={paths.QUESTIONS} component={Question} />
                <Route path={paths.INDEX} component={Auth} />
              </Switch>
            </SmartMainLayout>
          </AppContainer>
        </BrowserRouter>
      </Provider>
    </IntlProvider>
  );
};

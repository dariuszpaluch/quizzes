import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppContainer from 'containers/AppContainer';

import store from './store/store';
import Auth from 'modules/Auth';
import Question from 'modules/Question/Question';
import Tests from 'modules/Tests';
import Dashboard from 'modules/Dashboard/Dashboard';

import paths from 'consts/paths';

import localeData from '../locales/data.json';
import MakeTest from 'modules/MakeTest/MakeTest';

import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

import SmartMainLayout from 'modules/MainLayout/SmartMainLayout';

addLocaleData([...en, ...pl]);

export default class AppComponent extends Component {
  render() {
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
  }
}

import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import AppContainer from 'containers/AppContainer';

import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';
import { addLocaleData, IntlProvider } from 'react-intl';

import localeData from '../locales/data.json';
import RootAppComponent from 'src/RootAppComponent';

addLocaleData([...en, ...pl]);

const language =
  (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

export default class AppComponent extends Component {
  render() {
    console.log(this.props.history);

    return (
      <IntlProvider locale={language} messages={messages}>
        <Router history={this.props.history}>
          <AppContainer>
            <RootAppComponent />
          </AppContainer>
        </Router>
      </IntlProvider>
    );
  }
}

export const AppWithHot = hot(module)(AppComponent);

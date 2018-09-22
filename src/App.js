import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import AppContainer from 'containers/AppContainer';

// import { addLocaleData, IntlProvider } from 'react-intl';

// import localeData from '../locales/data.json';
import RootAppComponent from 'src/RootAppComponent';

// addLocaleData([...en, ...pl]);

// const language =
//   (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

// const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
// const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

import IntlProvider from 'modules/Intl/Intl';

if (process.env.NODE_ENV !== 'production') {
  const originalConsoleError = console.error;
  if (console.error === originalConsoleError) {
    console.error = (...args) => {
      if (args[0].indexOf('[React Intl] Missing message:') === 0) {
        return;
      }
      originalConsoleError.call(console, ...args);
    };
  }
}

export default class AppComponent extends Component {
  render() {
    return (
      <IntlProvider>
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

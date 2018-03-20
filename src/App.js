import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import AppContainer from 'containers/AppContainer';

import store from './store/store';
import Auth from 'modules/Auth';
import Question from 'modules/Question/Question';
import MainLayout from 'modules/MainLayout/MainLayout';
import Tests from "modules/Tests/Tests";
import paths from "consts/paths";

import {addLocaleData, IntlProvider} from 'react-intl';
import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

addLocaleData([...en, ...pl]);

import localeData from '../locales/data.json';


export default class AppComponent extends Component {

  render() {
    const language = (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;

    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
    const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;


    return (
      <IntlProvider locale={language} messages={messages}>
        <Provider store={store}>
          <BrowserRouter>
            <AppContainer>
              <Switch>
                <MainLayout>
                  <Route path={paths.TESTS} component={Tests}/>
                  <Route path={paths.QUESTIONS} component={Question}/>
                  <Route exact path={paths.INDEX} component={Auth}/>
                </MainLayout>
              </Switch>
            </AppContainer>
          </BrowserRouter>
        </Provider>
      </IntlProvider>

    )
  }
}
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import AppContainer from 'containers/AppContainer';

import store from './store/store';
import Auth from 'modules/Auth';
import Question from 'modules/Question/Question';
import MainLayout from 'modules/MainLayout/MainLayout';

export default class AppComponent extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer>
            <Switch>
              <MainLayout>
                <Route path="/question" component={Question}/>
                <Route path="/" component={Auth}/>
              </MainLayout>
            </Switch>
          </AppContainer>
        </BrowserRouter>
      </Provider>
    )
  }
}
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import AppContainer from 'containers/AppContainer';

import store from './store/store';
import Auth from 'modules/Auth';
import Test from 'modules/Test/Test';

export default class AppComponent extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer>
            <Switch>
              <Route path="/test" component={Test}/>
              <Route path="/" component={Auth}/>
            </Switch>
          </AppContainer>
        </BrowserRouter>
      </Provider>
    )
  }
}
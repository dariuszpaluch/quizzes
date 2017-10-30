import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import AppContainer from 'containers/AppContainer';

import store from './store/store';

import Page from 'modules/Page';
import SignIn from 'modules/SignIn';

export default class AppComponent extends Component {

  render() {
    return(
      <Provider store={ store }>
        <BrowserRouter>
          <AppContainer>
            <Switch>
              {/*<Route path="/" component={ Page }/>*/}
              <Route exact path="/sign-in" component={ SignIn }/>
            </Switch>
          </AppContainer>
        </BrowserRouter>
      </Provider>
    )
  }
}
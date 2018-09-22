import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App, { AppWithHot } from './App';
import createHistory from 'history/createBrowserHistory';

import store from './store';
const history = createHistory();

// openWebSocket(store, history);

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <Component history={history} />
    </Provider>,
    document.getElementById('app')
  );

render(module.hot ? AppWithHot : App);

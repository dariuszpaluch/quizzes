import { applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { webSocketMiddleware } from './webSocket/webSocket';

import rootReducer from './reducers';

function configureStore() {
  const middlewares = [
    applyMiddleware(ReduxThunk),
    applyMiddleware(webSocketMiddleware),
];

  if (window.devToolsExtension) {
    middlewares.push(window.devToolsExtension());
  }

  return createStore(rootReducer, compose(...middlewares));
}

const store = configureStore();

if (module.hot) {
  module.hot.accept('./reducers.js', () => {
    const nextRootReducer = require('./reducers.js').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;

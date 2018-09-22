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

  const store = createStore(rootReducer, compose(...middlewares));

  if (process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers.js', () =>
      store.replaceReducer(require('./reducers.js').default)
    );
  }

  return store;
}

export default configureStore();

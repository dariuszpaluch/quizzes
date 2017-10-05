import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from './../reducers';
import ReduxThunk from 'redux-thunk';

function configureStore() {
  const middlewares = [
    applyMiddleware(ReduxThunk)
  ];

  if(window.devToolsExtension) {
    middlewares.push(window.devToolsExtension());
  }

  return createStore(
    rootReducer,
    compose(...middlewares)
  )
}

const store = configureStore();

export default store;
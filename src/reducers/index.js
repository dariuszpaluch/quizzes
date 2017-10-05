import { combineReducers } from 'redux';

import { reducer as FormReducer }from 'redux-form';

const appReducer = combineReducers({
  form: FormReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
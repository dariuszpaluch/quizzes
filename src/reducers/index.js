import {combineReducers} from 'redux';

import {reducer as FormReducer} from 'redux-form';
import AuthReducer from 'modules/Auth/reducer';
import TestReducer from 'modules/Test/reducer';

const appReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  test: TestReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
import {combineReducers} from 'redux';

import {reducer as FormReducer} from 'redux-form';
import AuthReducer from 'modules/Auth/reducer';
import TestReducer from 'modules/Test/reducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

const appReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  test: TestReducer,
  toastr: toastrReducer // <- Mounted at toastr.

});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
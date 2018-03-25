import {combineReducers} from 'redux';

import {reducer as FormReducer} from 'redux-form';
import AuthReducer from 'modules/Auth/reducer';
import QuestionsReducer from 'modules/Question/reducer';
import TestsReducer from 'modules/Tests/utils/reducer';

import {reducer as toastrReducer} from 'react-redux-toastr'
const appReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  question: QuestionsReducer,
  tests: TestsReducer,
  toastr: toastrReducer // <- Mounted at toastr.
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
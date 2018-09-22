import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { reducer as FormReducer } from 'redux-form';
import AuthReducer from 'modules/Auth/reducer';
import QuestionsReducer from 'modules/Question/utils/reducer';
import TestsReducer from 'modules/Tests/utils/reducer';
import MakeTestReducer from 'modules/MakeTest/utils/reducer';
import MainLayoutReducer from 'modules/MainLayout/utils/reducer';
import IntlReducer from 'modules/Intl/reducer';

const appReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  question: QuestionsReducer,
  tests: TestsReducer,
  makeTest: MakeTestReducer,
  toastr: toastrReducer,
  mainLayout: MainLayoutReducer,
  intl: IntlReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;

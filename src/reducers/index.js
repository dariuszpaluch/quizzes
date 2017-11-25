import { combineReducers } from 'redux';

import { reducer as FormReducer }from 'redux-form';
import AuthReducer from 'modules/Auth/reducer';

    const appReducer = combineReducers({
  form: FormReducer,
  auth: AuthReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
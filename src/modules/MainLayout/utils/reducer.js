import { SET_APP_BAR_TITLE } from './actionsTypes'

import { createReducer } from 'utils/reducerUtils';

const getInitState = () => ({
  title: 'Quizzes',
});

export default createReducer(getInitState(), {
  [SET_APP_BAR_TITLE]: (state, action) => ({ ...state, title: action.title })
});
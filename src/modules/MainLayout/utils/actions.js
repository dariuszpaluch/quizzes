import { SET_APP_BAR_TITLE } from './actionsTypes';
import { storeAction } from 'actions/actionsUtils';

export const setAppBarTitle = title =>
  storeAction(SET_APP_BAR_TITLE, { title });

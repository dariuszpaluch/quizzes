import { storeAction } from 'actions/actionsUtils';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export function onChangeQuestionRate(language) {
  return storeAction(CHANGE_LANGUAGE, null, {
    language
  });
}

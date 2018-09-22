import { addLocaleData } from 'react-intl';
import { find, keys } from 'lodash';

import localeData from '../../../locales/data.json';

import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';
import { CHANGE_LANGUAGE } from 'modules/Intl/actions';

addLocaleData([...en, ...pl]);

const language =
  (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const initActiveLanguage = find(
  [languageWithoutRegionCode, language],
  language => !!localeData[language]
) || 'en';

export default function intlReducer(
  state = {
    locales: {},
    messages: localeData,
    activeLanguage: initActiveLanguage,
    prevLanguage: '',
    availableLanguages: keys(localeData),
  },
  action
) {
  switch (action.type) {
    case CHANGE_LANGUAGE: {
      const { language } = action.data;

      return {
        ...state,
        activeLanguage: language,
        prevLanguage: state.activeLanguage
      };
    }

    default: {
      return state;
    }
  }
}

export const getActiveLanguage = state => state.intl.activeLanguage;
export const getMessages = state => state.intl.messages[state.intl.activeLanguage];
export const getAvailableLanguages = state => state.intl.availableLanguages;

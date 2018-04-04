import { defineMessages } from 'react-intl';

const globalMessages = defineMessages({
  SAVE: {
    id: 'save',
    defaultMessage: 'Save',
  },
  CANCEL: {
    id: 'cancel',
    defaultMessage: 'Cancel'
  },
  NEXT: {
    id: 'Next',
    defaultMessage: 'Next'
  },
  PREV: {
    id: 'Prev',
    defaultMessage: 'Prev'
  },
  LOGOUT: {
    id: 'LOGOUT',
    defaultMessage: 'Logout'
  }
});

export default globalMessages;

export const pagesTitles = defineMessages({
  TESTS_RESULTS: {
    id: 'PAGES_TITLES.TESTS_RESULTS',
    defaultMessage: 'Tests results',
  },
  YOUR_TESTS: {
    id: 'PAGES_TITLES.YOUR_TESTS',
    defaultMessage: 'Your tests',
  },
  YOUR_QUESTIONS: {
    id: 'PAGES_TITLES.YOUR_QUESTIONS',
    defaultMessage: 'Questions',
  },
  SETTINGS: {
    id: 'PAGES_TITLES.SETTINGS',
    defaultMessage: 'Settings',
  }
});
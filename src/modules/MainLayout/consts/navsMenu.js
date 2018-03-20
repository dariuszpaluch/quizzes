import icons from 'consts/icons';
import paths from 'consts/paths';

const navsMenu = [
  {
    label: 'Tests results',
    icon: icons.tests_results,
    path: paths.TESTS_RESULTS,
    disabled: true,
  },
  {
    label: 'Tests',
    icon: icons.tests,
    path: paths.TESTS,
  },
  {
    label: 'Questions',
    icon: icons.questions,
    path: paths.QUESTIONS,
  },
  {
    label: 'Settings',
    icon: icons.settings,
    path: paths.QUESTIONS,
    disabled: true,
  }
];

export default navsMenu;
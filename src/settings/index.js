import paths from 'consts/paths';
console.log(WEBPACK_WEBSOCKET_URL, WEBPACK_API_URL);

export const API_URL = WEBPACK_API_URL;
export const WEBSOCKET_URL = WEBPACK_WEBSOCKET_URL;

export default {
  APP_NAME: 'Quizzes Rock'
};

export const VIEWS = {
  MY_QUIZZES: {
    path: paths.MY_QUIZZES,
    search: true
  }
};

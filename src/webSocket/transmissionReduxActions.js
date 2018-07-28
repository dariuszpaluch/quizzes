import sendMessage from './utils/sendMessage';

import * as socketMessageTypes from './socketMessageTypes';
import { GET_TEST_DETAILS } from 'modules/Tests/utils/actionTypes';

export default function transmissionReduxActions(webSocket, action, store) {
  switch (action.type) {
    case `${GET_TEST_DETAILS}_SUCCESS`: {
      sendMessage(webSocket, socketMessageTypes.TURN_ON_LISTENING_CHANGES_IN_TEST, {
        id: action.data.id
      });
      break;
    }
  }
}

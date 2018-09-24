import transmissionReduxActions from './transmissionReduxActions';
import parseReceivedMessage from './utils/parseReceivedMessage';
import handleMessage from './handleMessage';
import { SIGN_IN } from 'modules/Auth/actionTypes';
import { getToken } from 'modules/Auth/reducer';
import { API_URL } from 'settings';
const MAX_RECONNECT_NUMBER_OF_TRIALS = 10;
let reconnectNumber = 0;

let webSocket = null;
let reconnectTimeout = null;

export function _webSocketLog(...args) {
  console.group('WebSocket');
  console.info(...args);
  console.groupEnd();
}

export function getWebsocketIsOpen() {
  return !!webSocket && webSocket.readyState === WebSocket.OPEN;
}

export function webSocketMiddleware(store) {
  return next => action => {
    const result = next(action);

    if (getWebsocketIsOpen()) {
      transmissionReduxActions(webSocket, action, store);
    } else if(action.type === `${SIGN_IN}_SUCCESS`) {
      openWebSocket(store, null, action.data.token)
    }

    if(action.type === `LOGOUT`) {
      webSocket.close();
      reconnectTimeout && clearTimeout(reconnectTimeout);
    }

    return result;
  };
}

export default function openWebSocket(store, history, token) {
  webSocket = new WebSocket(`${WEBSOCKET_URL}?token=${token}`.replace('http', 'ws'));
  _webSocketLog(`Try to connect to ${WEBSOCKET_URL}?token=${token}`.replace('http', 'ws'));

  webSocket.onopen = _onOpenConnection;
  webSocket.onclose = _onCloseConnection.bind(null, store, history, token);
  webSocket.onmessage = _onMessage.bind(null, store, history);
  webSocket.onerror = _onError;
}

function _onOpenConnection() {
  reconnectTimeout = null;
  _webSocketLog('Open connection');
  reconnectNumber = 0;

  window.onbeforeunload = () => {
    webSocket.close();
  };
}

function _onMessage(store, history, evt) {
  const message = parseReceivedMessage(evt);
  _webSocketLog('Receive message', message);

  handleMessage(store, history, message);
}

function _onCloseConnection(store, history, token, event) {
  _webSocketLog('Connection has been closed.', event);

  if(!getToken(store.getState()))
    return null;

  if (reconnectNumber < MAX_RECONNECT_NUMBER_OF_TRIALS) {
    reconnectNumber += 1;
    reconnectTimeout = setTimeout(function() {
      openWebSocket(store, history, token);
    }, reconnectNumber * 1000);
  } else {
    console.error('Problem z połączeniem się z serwerem webSocket');
  }
}

function _onError() {
  _webSocketLog('Some error in communication.');
}



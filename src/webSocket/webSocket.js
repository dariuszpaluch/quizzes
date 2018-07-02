import transmissionReduxActions from './transmissionReduxActions';
import parseReceivedMessage from './utils/parseReceivedMessage';
import handleMessage from './handleMessage';
import { SIGN_IN } from 'modules/Auth/actionTypes';

const MAX_RECONNECT_NUMBER_OF_TRIALS = 5;
let webSocket = null;
let reconnectNumber = 0;

export function _webSocketLog(...args) {
  console.info(`[Websocket]`, ...args);
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
      console.log(action, action.data.token);

      openWebSocket(store, null, action.data.token)
    }

    return result;
  };
}

export default function openWebSocket(store, history, token) {
  console.log('token', token);
  webSocket = new WebSocket(`ws://localhost:3001?token=${token}`);
  _webSocketLog('Try to connect to ws://localhost:3001');

  webSocket.onopen = _onOpenConnection;
  // webSocket.onclose = _onCloseConnection.bind(null, store);
  webSocket.onmessage = _onMessage.bind(null, store, history);
  webSocket.onerror = _onError;
}

function _onOpenConnection() {
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

function _onCloseConnection(store, event) {
  _webSocketLog('Connection has been closed.', event);

  if (reconnectNumber < MAX_RECONNECT_NUMBER_OF_TRIALS) {
    reconnectNumber += 1;
    setTimeout(function() {
      openWebSocket(store);
    }, reconnectNumber * 1000);
  } else {
    alert('Problem z połączeniem się z serwerem webSocket');
  }
}

function _onError() {
  _webSocketLog('Some error in communication.');
}

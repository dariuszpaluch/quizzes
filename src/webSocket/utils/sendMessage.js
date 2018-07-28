import { _webSocketLog } from 'webSocket/webSocket';

export default function sendMessage(webSocket, type, data) {
  if (!!webSocket && webSocket.readyState === webSocket.OPEN) {
    const message = {
      type,
      data
    };

    _webSocketLog('Send message', message);
    webSocket.send(JSON.stringify(message));
  }
}

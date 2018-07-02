import { _webSocketLog } from 'webSocket/webSocket';

export default function sendMessage(webSocket, type, data) {
  if (!!webSocket && webSocket.readyState === webSocket.OPEN) {
    _webSocketLog('Send message', { type, ...data });

    webSocket.send(
      JSON.stringify({
        Type: type,
        ...data
      })
    );
  }
}

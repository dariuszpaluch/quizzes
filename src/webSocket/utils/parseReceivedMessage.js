import omit from 'lodash/omit';

export default function parseReceivedMessage(msg) {
  try {

  let parsedData = JSON.parse(msg.data);

  return {
    type: parsedData.Type,
    data: omit(parsedData, 'Type')
  };
  }
  catch (err) {
    console.group('WebSocket');
    console.warn(`Message ommited, wrong structure of message: ${msg}`);
    console.groupEnd();
    return {};
  }
}

import omit from 'lodash/omit';

export default function parseReceivedMessage(msg) {
  try {
    let parsedData = JSON.parse(msg.data);

    return {
      type: parsedData.type,
      data: parsedData.data,
      ...omit(parsedData, ['type', 'data'])
    };
  } catch (err) {
    console.group('WebSocket');
    console.warn(`Message ommited, wrong structure of message: ${JSON.stringify(msg)}`);
    console.groupEnd();
    return {};
  }
}

export default function jsonParse(data) {

  while(!(typeof data === 'object')) {
    data = JSON.parse(data);
  }

  return data;
}
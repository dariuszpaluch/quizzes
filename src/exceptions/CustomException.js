export default function CustomException(response) {
  this.response = response || {};
  this.name = 'CustomException';
}

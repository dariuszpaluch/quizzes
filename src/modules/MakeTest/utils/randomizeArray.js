export default function randomizeArray(array = []) {
  return array.sort(function() {
    return 0.5 - Math.random();
  });
}

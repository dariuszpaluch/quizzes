export default function stopEventBubbling(event) {
  event.stopPropagation();
  event.preventDefault();
}

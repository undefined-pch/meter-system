export function format(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  return `${year}-${month}-${day}`;
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

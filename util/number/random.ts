export function randomNumber(min: number, max: number, operator = v => v) {
  return operator(Math.random() * (max - min) + min);
}

export function randomNumber(min: number, max: number, operator = (v:number) => v) {
  return operator(Math.random() * (max - min) + min);
}

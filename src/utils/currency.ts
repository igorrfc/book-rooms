export function toFixed(num: number, fixed: number) {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
  //@ts-ignore
  return num.toString().match(re)[0];
}

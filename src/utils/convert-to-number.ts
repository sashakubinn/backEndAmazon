export function convertToNumber(input: string): number | string | undefined {
  const number = +input;
  return isNaN(number) ? undefined : number;
}

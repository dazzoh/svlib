/**
 * Format a number with a thousands separator and to a fixed dp.
 * @param number
 * @param {number} decimalPlaces
 * @param {string} thousandsSeparator
 * @param decimalSeparator
 */
export function formatNumber(number: number, decimalPlaces: number = 2, thousandsSeparator: string = ',', decimalSeparator: string = '.'): string {
  if (Number.isNaN(number)) {
    return '';
  }

  if(decimalPlaces == undefined){
    decimalPlaces = 0;
  }

  let isNeg = number < 0,
    parts = Math.abs(number).toFixed(decimalPlaces).split('.'),
    intPart = parts[0],
    intPartLength = intPart.length,
    thousands = Math.floor(intPartLength / 3), // number of thousands separators
    withCommas;

  if (decimalPlaces != 0) {
    withCommas = new Array(intPartLength + thousands + 1); // add extra place in array for dp part
    withCommas.push(decimalSeparator + parts[1]); // add the decimal part back in at the start (reversed later).
  } else {
    withCommas = new Array(intPartLength + thousands); // no need for dp part
  }

  let x = 0;
  for (let i = intPartLength - 1; i >= 0; i--) {
    withCommas.push(intPart[i]);
    if (++x % 3 == 0 && i != 0) {
      withCommas.push(thousandsSeparator);
    }
  }

  if (isNeg) {
    withCommas.push('-');
  }

  return withCommas.reverse().join('');
}

/**
 * Add padding to time component for display: 0 -> 00.
 * @param {number} value
 * @returns {string}
 */
export function formatTimeUnit(value: number): string {
  return (value < 10) ? '0' + value : value.toString();
}

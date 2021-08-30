/**
 * Helper function that parses strings with content similar to: true, trUE or TRUE or tr ue (for example) to Boolean type true.
 * @param str String to parse which can be in capital letters and also with spaces
 * @returns `true` or `false` as boolean type
 */
export function parseStrToBoolean(str: String) {
  return str.toLowerCase().toLowerCase().replace(/\s/g, '') === 'true' ? true : false;
}

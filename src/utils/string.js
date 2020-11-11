/**
 *
 *
 * @param {*} value
 * @param {*} length
 */
export const truncate = (value, length) =>
  value.length > length
    ? value.slice(0, length > 3 ? length - 3 : length) + "..."
    : value;

/**
 * Checks if a string starts with a given substring.
 *
 * @param {string} value
 * @param {string} search
 * @returns  Returns `true` if `value` contains `search`
 */
export const startsWith = (value, search) => {
  return value && value.indexOf(search) === 0;
};

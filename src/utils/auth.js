const APP_GLOBAL_VAR = "";

/**
 *
 *
 */
const getUser = () =>
  !!window.localStorage[APP_GLOBAL_VAR]
    ? JSON.parse(window.localStorage[APP_GLOBAL_VAR])
    : {};

/**
 *
 *
 * @param {*} user
 * @returns
 */
const setUser = (user) => {
  return (window.localStorage[APP_GLOBAL_VAR] = JSON.stringify(user));
};

/**
 *
 *
 * @param {*} { username, password, token }
 * @returns
 */
export const handleLogin = ({ username, password, token }) => {
  return setUser({
    username,
    token,
  });
};

/**
 *
 *
 * @returns
 */
export const isLoggedIn = () => {
  const user = getUser();

  return !!user.token;
};

/**
 *
 *
 * @param {*} callback
 * @returns
 */
export const logout = (callback) => {
  setUser({});
  callback();
};
const AUTH_VAR = `${process.env.REACT_APP_BASE_NAME}_auth`;

/**
 *
 *
 */
const getUser = () =>
  !!window.localStorage[AUTH_VAR]
    ? JSON.parse(window.localStorage[AUTH_VAR])
    : {};

/**
 *
 *
 * @param {*} user
 * @returns
 */
const setUser = (user) => {
  return (window.localStorage[AUTH_VAR] = JSON.stringify(user));
};

/**
 *
 *
 * @param {*} { username, password, token }
 * @returns
 */
export const handleLogin = ({ email, password, token }) => {
  return setUser({
    email,
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

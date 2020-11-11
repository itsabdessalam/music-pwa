const API_URL_AUTH = process.env.REACT_APP_API_URL_AUTH;
const axios = require("axios");

module.exports = {
  login(user) {
    return axios.post(`${API_URL_AUTH}/login`, user, {
      "Content-Type": "application/json",
    });
  },
};

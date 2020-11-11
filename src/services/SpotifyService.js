const SPOTIFY_API_URL = process.env.REACT_APP_SPOTIFY_API_URL;
const SPOTIFY_TOKEN_URL = process.env.REACT_APP_SPOTIFY_TOKEN_URL;
const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const axios = require("axios");
const qs = require("qs");

const getToken = () => {
  return axios({
    method: "post",
    url: SPOTIFY_TOKEN_URL,
    data: qs.stringify({
      grant_type: "client_credentials",
    }),
    headers: {
      Authorization: `Basic ${btoa(
        SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
      )}`,
    },
  });
};

module.exports = {
  getToken() {
    return axios.get();
  },
  async getTracks() {
    const { data } = await getToken();
    const { access_token, token_type } = data;

    return axios({
      method: "get",
      url: `${SPOTIFY_API_URL}/playlists/4734kkip4gyyGiXnGJR9wv/tracks`,
      headers: {
        Accept: "application/json",
        Authorization: `${token_type} ${access_token}`,
      },
    });
  },
  async getTrackById(id) {
    const { data } = await getToken();
    const { access_token, token_type } = data;

    return axios.get(`${SPOTIFY_API_URL}/tracks/${id}`);
  },
  async searchTracks(query) {
    const { data } = await getToken();
    const { access_token, token_type } = data;

    return axios({
      method: "get",
      url: `${SPOTIFY_API_URL}/search`,
      params: {
        q: query,
        type: "track",
      },
      headers: {
        Accept: "application/json",
        Authorization: `${token_type} ${access_token}`,
      },
    });
  },
};
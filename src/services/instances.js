const axios = require("axios");
const { API_GATEWAY_ENDPOINT } = require("../config/allEnv");

const AUTH_GATEWAY = `${API_GATEWAY_ENDPOINT}/auth`;
const PUBLIC_POST_GATEWAY = `${API_GATEWAY_ENDPOINT}/publicPostRoutes`;
const S3_CLONE_GATEWAY = `${API_GATEWAY_ENDPOINT}/s3_clone`;
const INSTA_SCRAP = `${API_GATEWAY_ENDPOINT}/insta_scrap`;

const allServices = (token) => {
  const authService = axios.create({
    baseURL: AUTH_GATEWAY,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const publicPostService = axios.create({
    baseURL: PUBLIC_POST_GATEWAY,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const s3CloneService = axios.create({
    baseURL: S3_CLONE_GATEWAY,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const instaScrapService = axios.create({
    baseURL: INSTA_SCRAP,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    authService,
    publicPostService,
    s3CloneService,
    instaScrapService,
  };
};

module.exports = allServices;

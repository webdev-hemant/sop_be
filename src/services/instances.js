const axios = require("axios");
const { API_GATEWAY_ENDPOINT } = require("../config/allEnv");

const endpoints = {
  AUTH_GATEWAY: `${API_GATEWAY_ENDPOINT}/auth`,
  PUBLIC_POST_GATEWAY: `${API_GATEWAY_ENDPOINT}/publicPostRoutes`,
  S3_CLONE_GATEWAY: `${API_GATEWAY_ENDPOINT}/s3_clone`,
  INSTA_SCRAP: `${API_GATEWAY_ENDPOINT}/insta_scrap`,
};

const createService = (baseURL, token) => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const allServices = (token) => {
  const services = {};
  for (const [key, baseURL] of Object.entries(endpoints)) {
    services[key] = createService(baseURL, token);
  }
  return services;
};

module.exports = allServices;

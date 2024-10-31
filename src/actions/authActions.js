const { ADMIN_EMAIL, ADMIN_PASSWORD } = require("../config/allEnv");
const allServices = require("../services/instances");

exports.getAllUsers = async (token) => {
  const { data } = await allServices.authService.get("/api/auth/getAllUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

exports.registerUser = async (body) => {
  const { data } = await allServices.authService.post(
    "/api/auth/register",
    body
  );
  return data;
};

exports.loginUser = async (body) => {
  const { data } = await allServices.authService.post("/api/auth/login", body);
  return data;
};

exports.verifyToken = async (token) => {
  const { data } = await allServices.authService.get(
    "/api/auth/getUserDetails",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

exports.generateAdminToken = async () => {
  const body = {
    usernameOrEmail: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  };
  const response = await allServices.authService.post("/api/auth/login", body);
  const token = response?.data?.token;
  return token;
};

exports.getUsersByIds = async (ids) => {
  const { data } = await allServices.authService.post(
    "/api/auth/getUsersByIds",
    { ids }
  );
  return data;
};

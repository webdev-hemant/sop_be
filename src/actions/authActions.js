const allServices = require("../services/instances");

exports.getAllUsers = async (token) => {
  const { data } = await allServices(token).authService.get(
    "/api/auth/getAllUsers"
  );
  return data;
};

exports.registerUser = async (body) => {
  const { data } = await allServices().authService.post(
    "/api/auth/register",
    body
  );
  return data;
};

exports.loginUser = async (body) => {
  const { data } = await allServices().authService.post(
    "/api/auth/login",
    body
  );
  return data;
};

exports.verifyToken = async (token) => {
  const { data } = await allServices().authService.get(
    "/api/auth/getUserDetails",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const { default: axios } = require("axios");

// Function to decode the token
const decodeToken = (req) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    throw new Error("No token provided");
  }
  return token;
};

const verifyToken = async (token) => {
  const { data } = await axios.get(
    "http://localhost:8090/auth/api/auth/getUserDetails",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const getAllUsersAuth = async (token) => {
  const { data } = await axios.get(
    "http://localhost:8090/auth/api/auth/getAllUsers",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

module.exports = { decodeToken, verifyToken, getAllUsersAuth };

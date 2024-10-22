const { decodeToken, verifyToken } = require("../utils");
// Function to get user details using the token
const getUserDetails = async (req, res, next) => {
  try {
    const token = decodeToken(req);
    const data = await verifyToken(token);
    req.user = data;
    next();
  } catch (error) {
    res.status(error.status).json({ error: error.response.statusText });
  }
};

module.exports = { getUserDetails };

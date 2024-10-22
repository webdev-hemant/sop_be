const { getAllUsersAuth } = require("../utils");

exports.getAllUsers = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const users = await getAllUsersAuth(token);
    res.status(200).json({ total: users.length, users });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.response.data || { message: "Internal server error" });
  }
};

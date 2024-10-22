const {
  getAllUsers,
  registerUser,
  loginUser,
} = require("../actions/authActions");
const { extractToken } = require("../utils");

exports.getAllUsers = async (req, res) => {
  try {
    const token = extractToken(req);
    const users = await getAllUsers(token);
    res.status(200).json({ total: users.length, users });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(error.response.data || { message: "Internal server error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password, firstName, lastName, birthdate, email } =
      req.body;

    const data = await registerUser({
      username,
      password,
      firstName,
      lastName,
      birthdate,
      email,
    });

    res.send(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(error.response.data || { message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const data = await loginUser({
      usernameOrEmail,
      password,
    });

    res.send(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(error.response.data || { message: "Internal server error" });
  }
};

exports.getUserDetailsCntr = async (req, res) => {
  const userDetails = req.user;
  try {
    res.send(userDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

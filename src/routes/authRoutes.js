const express = require("express");
const {
  register,
  login,
  getAllUsers,
  getUserDetailsCntr,
} = require("../controllers/authController");
const { getUserDetails } = require("../middleware/getUserDetails");

const router = express.Router();

router.get("/getAllUsers", getAllUsers);

router.post("/register", register);
router.post("/login", login);
router.get("/getUserDetails", getUserDetails, getUserDetailsCntr);

module.exports = router;

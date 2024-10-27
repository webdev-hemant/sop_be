const express = require("express");
const { getAllConversations } = require("../controllers/chatController");

const router = express.Router();

router.get("/getAllConversations", getAllConversations);

module.exports = router;

const express = require("express");
const { getAllConversations, getMessages } = require("../controllers/chatController");

const router = express.Router();

router.get("/getAllConversations", getAllConversations);

router.get("/getMessages/:conversationId", getMessages);

module.exports = router;

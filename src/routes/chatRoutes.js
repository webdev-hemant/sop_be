const express = require("express");
const { getAllConversations, getMessages, createConversation } = require("../controllers/chatController");

const router = express.Router();

router.post("/createConversation", createConversation);

router.get("/getAllConversations", getAllConversations);

router.get("/getMessages/:conversationId", getMessages);

module.exports = router;

const {
  getAllConversationsActon,
  getMessagesActions,
} = require("../actions/chatActions");
const { extractToken } = require("../utils");

exports.getAllConversations = async (req, res) => {
  try {
    const token = extractToken(req);
    const data = await getAllConversationsActon(token);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(error.response.data || { message: "Internal server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const token = extractToken(req);
    const data = await getMessagesActions({ conversationId, token });

    res.status(200).json({ total: data.length, data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(error.response.data || { message: "Internal server error" });
  }
};

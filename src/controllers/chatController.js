const {
  getAllConversationsActon,
  getMessagesActions,
  createConversationAction,
} = require("../actions/chatActions");
const { extractToken } = require("../utils");

exports.createConversation = async (req, res) => {
  try {
    const { user2Id, name } = req.body;
    if (!user2Id) throw new Error("user2Id is required!");
    const token = extractToken(req);
    const data = await createConversationAction({ user2Id, name, token });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(
        error.response.data || {
          message: error.message || "Internal server error",
        }
      );
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const token = extractToken(req);
    const data = await getAllConversationsActon(token);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(
        error.response.data || {
          message: error.message || "Internal server error",
        }
      );
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
      .json(
        error.response.data || {
          message: error.message || "Internal server error",
        }
      );
  }
};

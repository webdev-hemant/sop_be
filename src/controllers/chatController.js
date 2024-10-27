const { getAllConversationsActon } = require("../actions/chatActions");
const { extractToken } = require("../utils");

exports.getAllConversations = async (req, res) => {
  try {
    const token = extractToken(req);
    const data = await getAllConversationsActon(token);
    res.status(200).json({ total: data.length, data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(error.response.data || { message: "Internal server error" });
  }
};

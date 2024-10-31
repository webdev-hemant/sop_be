const { getUsersByIds } = require("../actions/authActions");
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
    res.status(500).json(
      error.response.data || {
        message: error.message || "Internal server error",
      }
    );
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const { data: conversations } = await getAllConversationsActon({
      userId,
      queries: req.query,
    });

    // Collect unique user IDs and map conversations by ID
    const uniqueUserIds = new Set();
    const conversationsMap = new Map();

    conversations.forEach(({ user1Id, user2Id, id }) => {
      const otherUserId = user1Id === userId ? user2Id : user1Id;
      uniqueUserIds.add(otherUserId);
      conversationsMap.set(id, { conId: id, userId: otherUserId });
    });

    const users = await getUsersByIds([...uniqueUserIds]);

    // Create a map of user details by user ID
    const userDetailsMap = Object.fromEntries(
      users.map((user) => [user.id, user])
    );

    // Enrich conversations with user details
    const enrichedConversations = conversations
      .map((convo) => {
        const userDetail =
          userDetailsMap[conversationsMap.get(convo.id)?.userId];
        return userDetail ? { ...convo, userDetails: userDetail } : null;
      })
      .filter(Boolean);

    res.status(200).json(enrichedConversations);
  } catch (error) {
    console.error(error);
    res.status(500).json(
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
    const response = await getMessagesActions({
      conversationId,
      token,
      queries: req.query,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(
      error.response.data || {
        message: error.message || "Internal server error",
      }
    );
  }
};

const allServices = require("../services/instances");

exports.createConversationAction = async ({ user2Id, name, token }) => {
  const { data } = await allServices.chatService.post(
    "/api/conversations/create",
    { user2Id, name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

exports.getAllConversationsActon = async (token) => {
  const { data } = await allServices.chatService.get("/api/conversations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

exports.getMessagesActions = async ({ conversationId, token }) => {
  const { data } = await allServices.chatService.get(
    `/api/messages/${conversationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const allServices = require("../services/instances");

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

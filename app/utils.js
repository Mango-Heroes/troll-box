module.exports = {
  user_online: async (io, User, user) => {
    await User.upsert(user);
  },

  fetch_history: async (io, sockId, User, Message) => {
    const messages = await Message.findAll({
      order: [
        ["timestamp", "DESC"]
      ], limit: 20
    });

    let history = [];
    for await (let message of messages) {
      const author = await User.findOne({ where: { id: message.userId } });
      message.dataValues.author = author;
      history.push(message);
    }

    io.to(sockId).emit(
      "history",
      history.reverse()
    );
  },
};

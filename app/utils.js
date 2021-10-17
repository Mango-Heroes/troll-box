module.exports = {
  user_online: async (io, User, user, status) => {
    user.active = status;
    await User.upsert(user);
    io.to("trollbox").emit(
      "update_users",
      await User.findAll({ where: { active: true } })
    );
  },

  fetch_history: async (io, Message) => {
    io.to("trollbox").emit(
      "history",
      await Message.findAll({ order: [
          ["createdAt", "DESC"]
        ], limit: 20 })
    );
  },
};

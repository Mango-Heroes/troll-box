const { sequelize, DataTypes } = require("../app/db");

const Message = sequelize.define(
  "Message",
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  }
);

module.exports = Message;

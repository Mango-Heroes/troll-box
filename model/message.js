const { sequelize, DataTypes, fn } = require("../app/db");
const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);

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
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timestamp: {
      type: TIMESTAMP,
      allowNull: false,
    }
  },
  {
    timestamps: false
  }
);

module.exports = Message;

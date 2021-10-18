const { sequelize, DataTypes } = require("../app/db");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    sockId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  }
);

module.exports = User;

const { sequelize, DataTypes } = require("../app/db");

const User = sequelize.define(
  "User",
  {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sockId : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    profileImg: {
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

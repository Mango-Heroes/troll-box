const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mango", "root", "password", {
  dialect: "mysql",
  host: "192.168.0.103",
});

module.exports = { sequelize, DataTypes };

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mango", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = { sequelize, DataTypes };

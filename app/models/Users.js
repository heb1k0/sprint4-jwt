const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysql");

class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    porcentaje: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, modelName: "user" }
);

module.exports = User;

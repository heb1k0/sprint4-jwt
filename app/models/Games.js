const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysql");
const User = require("./Users");

class Game extends Model {}
Game.init(
  {
    Dado1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Dado2: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    result:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    won:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  { sequelize, modelName: "Game" }
);

User.hasMany(Game, {
    foreignKey: {
      allowNull: true,
    },
});
  
Game.belongsTo(User); // A BelongsTo B

module.exports = Game;

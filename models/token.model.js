const { Model, DataTypes } = require("sequelize");
const db = require("../db/db");

class Token extends Model {}

Token.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },

    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Token",
  }
);

module.exports = Token;

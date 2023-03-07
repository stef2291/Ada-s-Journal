const { Model, DataTypes } = require("sequelize");
const db = require("../db/db");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    level: {
      type: DataTypes.ENUM("Admin", "Helper", "Visitor"),
      defaultValue: "Visitor",
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

module.exports = User;

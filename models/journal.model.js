const { Model, DataTypes } = require("sequelize");
const db = require("../db/db");

class Journal extends Model {}

Journal.init(
  {
    title: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize: db }
);

module.exports = Journal;

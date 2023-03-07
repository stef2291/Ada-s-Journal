const path = require("path");
const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
});

db.sync({ force: true }) // Use force: true to drop existing tables and recreate them
  .then(() => {
    console.log("Tables created successfully");
  })
  .catch((err) => {
    console.error("Unable to create tables:", err);
  });

module.exports = db;

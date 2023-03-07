const express = require("express");
const Journal = require("../models/journal.model");
const User = require("../models/user.model");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
require("dotenv").config(); // dotenv gives access to variables from the .env file using process.env

/**
 * TO DO:
 *
 * Learn About OAuth
 *
 * Fix user model
 *
 * create a database with active jwt tokens (temporary)
 * database should include expiration date and the user that owns it
 * database is populated on Register and Login
 * Logout API deletes token
 *
 * Every API except Register and Login, identify users from the token (req.header / jwt.verify)
 *
 */

const jwt = require("jsonwebtoken");

const jwtSecret = process.env.SECRET;
console.log(jwtSecret);

const app = express();
app.use(bodyParser.json());

const SALT_COUNT = 10;

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Create a new user - register page
app.post("/users", async (req, res) => {
  const { id, name, password, level } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const user = await User.create({
      name,
      password: hashedPassword,
    });

    const tokenPayload = {
      name: user.name,
      level: user.level,
    };

    const token = jwt.sign(tokenPayload, jwtSecret);
    res.status(201).send("User Successfully Added to db");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//Login existing user
app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({
    where: {
      name,
    },
  });

  console.log(user, req.header);

  if (!user) {
    return res.send("Invalid username or password").status(401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(passwordMatch);

  if (!passwordMatch) {
    return res.send("Invalid username or password").status(401);
  } else {
    const tokenPayload = {
      name: user.name,
      level: user.level,
    };
    const token = jwt.sign(tokenPayload, jwtSecret);



    res.status(201).send({ message: "you are logged in", token });
    // once login, you can use jwt.verify() on every other API
  }
});

//Update Password
app.put("/users/password", async (req, res) => {
  const { name, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { name } });

    if (!user) {
      return res.status(404).send("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid username or password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_COUNT);

    await user.update({ password: hashedPassword });

    res.status(200).send("Password updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//AUTHENTICATION FUNCTION

// Delete a user by ID
app.delete("/users", async (req, res, next) => {
  const { deleteUsername } = req.body;

  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    admin = jwt.verify(token, jwtSecret);
    console.log(admin); // Revisit!

    if (admin.level !== "Admin") {
      return res
        .status(403)
        .send("Unauthorised request - Only admins can perform this action");
    }

    const user = await User.findOne({ where: { name: deleteUsername } });

    if (user) {
      await user.destroy();
      res.status(200).send(`User deleted successfully`);
    } else {
      res.status(401).send(`User not found`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/journals", async (req, res) => {
  try {
    const journal = await Journal.findAll();
    res.status(200).send(journal);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/journals", async (req, res) => {
  const { title, finished } = req.body;

  try {
    await Journal.create({
      title,
      finished,
    });
    res.status(201).send("Journal Successfully Added to db");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.delete("/journals", async (req, res) => {
  const { title } = req.body;
  console.log(title);
  try {
    const journal = await Journal.findOne({
      where: {
        title,
      },
    });

    if (journal) {
      console.log(journal);
      await journal.destroy();
      res.status(200).send("Journal Deleted!");
    } else {
      res.status(404).send("Journal Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

const db = require("./db/db");
const Journal = require("./models/journal.model");
const User = require("./models/user.model");
const bcrypt = require("bcrypt");

async function seed() {
  await db.sync({ force: true });

  await Journal.bulkCreate([
    {
      title: "My First Entry",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "My Second Entry",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    },
    {
      title: "My Third Entry",
      content: "Et harum quidem rerum facilis est et expedita distinctio.",
    },
    {
      title: "My Fourth Entry",
      content:
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque.",
    },
  ]);

  await Promise.all(
    [
      {
        name: "Ada Lovelace",
        password: "1234",
        level: "Admin",
      },
      {
        name: "James Bond",
        password: "abc123",
        level: "Helper",
      },
      {
        name: "Katy Perry",
        password: "password123!",
      },
      {
        name: "Bill Gates",
        password: "12345",
        level: "Visitor",
      },
    ].map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return User.create({
        id: user.id,
        name: user.name,
        password: hashedPassword,
        level: user.level,
      });
    })
  );
}

seed();

module.exports = seed;

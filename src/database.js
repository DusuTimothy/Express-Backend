const bcrypt = require("bcrypt");

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

const Users = [
  {
    id: 1,
    name: "dusu",
    email: "dusu@example.com",
    role: "user",
    password: bcrypt.hashSync("Dusu@123", saltRounds)
  },
  {
    id: 2,
    name: "timothy",
    email: "timothy@example.com",
    role: "user",
    password: bcrypt.hashSync("Timothy@123", saltRounds)
  },
  {
    id: 3,
    name: "lois",
    email: "lois@example.com",
    role: "admin",
    password: bcrypt.hashSync("Lois@123", saltRounds)
  }
];

const Products = [
  {
    id: 1,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with USB receiver",
    price: 29.99
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches",
    price: 89.99
  },
  {
    id: 3,
    name: "USB-C Hub",
    description: "7-in-1 USB-C hub with HDMI and SD card reader",
    price: 49.99
  }
];

module.exports = { Users, Products };

const { hashPasswordSync } = require("./utils/hashPassword");

const Users = [
  {
    id: 1,
    name: "dusu",
    email: "dusu@example.com",
    role: "user",
    password: hashPasswordSync("Dusu@1234")
  },
  {
    id: 2,
    name: "timothy",
    email: "timothy@example.com",
    role: "user",
    password: hashPasswordSync("Timothy@1234")
  },
  {
    id: 3,
    name: "lois",
    email: "lois@example.com",
    role: "admin",
    password: hashPasswordSync("Lois@1234")
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

const bcrypt = require("bcrypt");

const saltRounds = () => Number(process.env.SALT_ROUNDS) || 10;

const hashPassword = (password) => bcrypt.hash(password, saltRounds());

// const hashPasswordSync = (password) => bcrypt.hashSync(password, saltRounds());

module.exports = { hashPassword }; 

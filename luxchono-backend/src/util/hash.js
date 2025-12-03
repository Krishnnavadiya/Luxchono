const { hashSync, compareSync } = require("bcryptjs");

function hashPassword(password) {
  return hashSync(password, 8);
}

function comparePassword(password, hashPassword) {
  return compareSync(password, hashPassword);
}

module.exports = { hashPassword, comparePassword };

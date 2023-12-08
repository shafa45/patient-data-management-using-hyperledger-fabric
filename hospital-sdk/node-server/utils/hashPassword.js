const bcrypt = require("bcrypt");

const hashPassword = (password, sampleSalt) => {
  // const salt = parseInt(sampleSalt) || bcrypt.genSaltSync(10);
  // const salt =  bcrypt.genSaltSync(10);
  // return bcrypt.hashSync(password, salt);
  return password;
};

const comparePassword = (passwordToCheck, hashedPassword) => {
  // return bcrypt.compareSync(passwordToCheck, hashedPassword);
  return passwordToCheck == hashedPassword
};

module.exports = { hashPassword, comparePassword };

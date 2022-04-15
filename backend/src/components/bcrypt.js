const bcrypt = require("bcrypt");
const salt = process.env.BCRYPT_SALT;
bcrypt.hash("admin", salt, function (err, hash) {
  console.log(hash);
});

const mongose = require("mongoose");

const userSchema = new mongose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  verificationCode: String,
  createdAt: { type: Date, default: Date.now },
});

const Users = mongose.model("users", userSchema);
module.exports = Users;

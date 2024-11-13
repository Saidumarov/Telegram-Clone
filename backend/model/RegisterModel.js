const mongose = require("mongoose");

const registerSchema = new mongose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const Register = mongose.model("users", registerSchema);
module.exports = Register;

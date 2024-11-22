const mongose = require("mongoose");

const registerSchema = new mongose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  verificationCode: String,
  createdAt: { type: Date, default: Date.now },
});

const Register = mongose.model("users", registerSchema);
module.exports = Register;

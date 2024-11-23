const { Router } = require("express");
const router = Router();
const register = require("../auth/register");
const sendCode = require("../auth/send-code");
const verifyCode = require("../auth/veryfiy");
const users = require("../users");

router.use("/users", users);
router.use("/register", register);
router.use("/send-code", sendCode);
router.use("/verify-code", verifyCode);

module.exports = router;

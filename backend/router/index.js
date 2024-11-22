const { Router } = require("express");
const router = Router();
const register = require("../auth/register");
const sendCode = require("../auth/send-code");
const verifyCode = require("../auth/veryfiy");
router.use("/register", register);
router.use("/send-code", sendCode);
router.use("/verify-code", verifyCode);

module.exports = router;

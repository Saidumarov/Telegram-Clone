const { Router } = require("express");
const router = Router();
const register = require("../auth/register");
const login = require("../auth/login");
router.use("/register", register);
router.use("/login", login);

module.exports = router;

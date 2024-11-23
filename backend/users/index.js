const express = require("express");
const jwt = require("jsonwebtoken");
const Users = require("../model/UsersModel"); 

const router = express.Router();

// Middleware: Tokenni tekshirish
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"

  if (!token) return res.status(401).json({ error: "Token mavjud emas" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token yaroqsiz" });
    req.user = user; // Token ichidagi foydalanuvchi ma'lumotlari
    next();
  });
};

// GET foydalanuvchi
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await Users.findById(req.user.userId); // Token ichidagi userId
    if (!user) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }
    res.json({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;

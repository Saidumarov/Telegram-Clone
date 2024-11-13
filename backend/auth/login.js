const express = require("express");
const router = express.Router();
const Register = require("../model/RegisterModel");
const jwt = require("jsonwebtoken");

// JWT ni yaratish uchun maxfiy kalit
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const fields = [
    { field: email, errorMessage: "Emailni kiriting" },
    { field: password, errorMessage: "Parolni kiriting" },
  ];

  for (const { field, errorMessage } of fields) {
    if (!field) {
      return res.status(400).json({ error: errorMessage });
    }
  }
  try {
    // Foydalanuvchini topish
    const user = await Register.findOne({ email });
    if (user) {
      // Parolni tekshirish
      const isPassword = user.password === password;
      if (isPassword) {
        // Parol to'g'ri bo'lsa, JWT tokenini yaratish
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          JWT_SECRET_KEY,
          {
            expiresIn: "1d", // Token 1 kun davomida amal qiladi
          }
        );
        // Foydalanuvchiga muvaffaqiyatli kirishni va tokenni qaytarish
        res.status(200).json({
          message: "Foydalanuvchi muvaffaqiyatli kirdi",
          access_token: token,
        });
      } else {
        // Parolni to'g'ri emas
        res.status(401).json({ error: "Parolni to'g'ri emas" });
      }
    } else {
      // Email ni to'g'ri emas
      res.status(404).json({ error: "Emailni to'g'ri emas" });
    }
  } catch (error) {
    // Xatolikni qaytarish
    console.error(error.message);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;

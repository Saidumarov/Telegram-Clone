const express = require("express");
const router = express.Router();
const Register = require("../model/RegisterModel");
const jwt = require("jsonwebtoken");

const generateJWTToken = (userId) => {
  const scretKey = process.env.JWT_SECRET_KEY; // Maxfiy kalitni .env faylidan olish
  const token = jwt.sign({ userId }, scretKey, { expiresIn: "1d" }); // Tokenning amal qilish muddati 1 kun
  return token;
};

router.post("/", async (req, res) => {
  const { lastname, firstname, phone } = req.body;
  const fields = [
    { field: lastname, errorMessage: "Familiyangizni kiriting" },
    { field: firstname, errorMessage: "Ismingizni kiriting" },
    { field: phone, errorMessage: "Emailni kiriting" },
  ];

  for (const { field, errorMessage } of fields) {
    if (!field) {
      return res.status(400).json({ error: errorMessage });
    }
  }
  try {
    // Taqdim etilgan name  ega foydalanuvchi mavjudligini tekshirish
    const userExists = await Register.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ error: "Foydalanuvchi mavjud" });
    }
    // Yangi Register ob'ektini yaratish
    const register = new Register({
      lastname,
      firstname,
      email,
      password,
    });
    await register.save();
    // Foydalanuvchi idsini oling
    const id = register._id;
    // JWT tokenini yaratish
    const token = generateJWTToken(id);
    // Muvaffaqiyatli xabar, ma'lumot va token bilan javob yuborish
    res.json({
      message: "Ro'yxatdan muvaffaqiyatli o'tildi",
      access_token: token,
    });
  } catch (error) {
    // Xato javobini yuborish
    res.status(400).json({ error: err.message });
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;

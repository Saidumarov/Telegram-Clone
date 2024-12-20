const express = require("express");
const router = express.Router();
const Users = require("../model/UsersModel");
const jwt = require("jsonwebtoken");

// JWT token yaratish funksiyasi
const generateJWTToken = (userId) => {
  const secretKey = process.env.JWT_SECRET_KEY; // Maxfiy kalitni .env faylidan olish
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1d" }); // Tokenning amal qilish muddati 1 kun
  return token;
};

// Foydalanuvchi ma'lumotlarini yangilash va tokenni qaytarish
router.put("/", async (req, res) => {
  const { phone, lastname, firstname } = req.body;

  // Kiritilgan maydonlarni tekshirish
  const fields = [
    { field: phone?.trim(), errorMessage: "Telefon raqamni kiriting" },
    { field: lastname?.trim(), errorMessage: "Familiyangizni kiriting" },
    { field: firstname?.trim(), errorMessage: "Ismingizni kiriting" },
  ];

  for (const { field, errorMessage } of fields) {
    if (!field) {
      return res.status(400).json({ error: errorMessage });
    }
  }

  try {
    // Telefon raqami bo‘yicha foydalanuvchini topish
    const user = await Users.findOne({ phone });

    if (!user) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }

    // Foydalanuvchi ma'lumotlarini yangilash
    user.lastname = lastname;
    user.firstname = firstname;

    // Yangilangan ma'lumotlarni saqlash
    await user.save();

    // Tokenni yaratish
    const token = generateJWTToken(user?._id);

    res.status(200).json({
      access_token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;

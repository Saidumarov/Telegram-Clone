const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Register = require("../model/RegisterModel");

const generateVerificationCode = () => {
  return crypto.randomInt(100000, 999999); // 6 xonali tasdiqlash kodi
};

// Telefon raqamni yuborish va tasdiqlash kodini yuborish
router.post("/", async (req, res) => {
  const { phone } = req.body;
  if (!phone?.trim()) {
    return res.status(400).json({ error: "Telefon raqamni kiriting" });
  }

  try {
    // 6 xonali tasdiqlash kodini yaratish
    const verificationCode = generateVerificationCode();
    // TODO: SMS Gateway orqali tasdiqlash kodini yuborish

    // Kodni vaqtinchalik bazada yoki keshda saqlash
    await Register.updateOne(
      { phone },
      { phone, verificationCode },
      { upsert: true } // Foydalanuvchi mavjud bo'lmasa, yaratadi
    );

    return res
      .status(200)
      .json({ message: "Tasdiqlash kodi yuborildi", code: verificationCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;

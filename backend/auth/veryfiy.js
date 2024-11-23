const { Router } = require("express");
const router = Router();
const Register = require("../model/RegisterModel");
const jwt = require("jsonwebtoken");

// JWT token yaratish funksiyasi
const generateJWTToken = (userId) => {
  const secretKey = process.env.JWT_SECRET_KEY; // Maxfiy kalitni .env faylidan olish
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1d" }); // Tokenning amal qilish muddati 1 kun
  return token;
};

router.post("/", async (req, res) => {
  const { phone, verificationCode } = req.body;

  if (!phone?.trim() || !verificationCode?.trim()) {
    return res
      .status(400)
      .json({ error: "Telefon raqam va tasdiqlash kodini kiriting" });
  }

  try {
    // Telefon raqami va kodni tekshirish
    const user = await Register.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ error: "Tasdiqlash kodi noto'g'ri" });
    }

    // Tasdiqlash kodi to'g'ri - `verificationCode` ni o'chirish
    await Register.findOneAndUpdate(
      { phone },
      { $unset: { verificationCode: "" } }, // verificationCode maydonini olib tashlash
      { new: true } // Yangilangan foydalanuvchini qaytaradi (ixtiyoriy)
    );

    const token = generateJWTToken(user?._id);

    // Javob yuborish
    if (user?.firstname && user?.lastname) {
      return res.status(200).json({
        message: "Kod tasdiqlandi.",
        user: true,
        token,
      });
    } else {
      return res.status(200).json({
        message: "Kod tasdiqlandi. Endi ism va familiya yuboring",
        user: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;

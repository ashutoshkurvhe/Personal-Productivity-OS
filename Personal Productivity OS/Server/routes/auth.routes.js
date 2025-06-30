const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserProfile,
  updateTheme,
  updateSettings,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);
router.put("/profile", protect, updateUserProfile);
router.put("/theme", protect, updateTheme);
router.put("/settings", protect, updateSettings);

module.exports = router;

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {sendWebPushNotification, sendEmailReminder} = require("../controllers/notification.controller");

const router = express.Router();

router.post("/web", protect, sendWebPushNotification);
router.post("/email", protect, sendEmailReminder);

module.exports = router;
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  importICal,
  getCalendarEvents,
} = require("../controllers/event.controller");

const router = express.Router();

router.post("/import", protect, importICal);
router.get("/", protect, getCalendarEvents);

module.exports = router;

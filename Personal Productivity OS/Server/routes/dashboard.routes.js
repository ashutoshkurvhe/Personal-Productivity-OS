const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getDashboardData } = require("../controllers/dashbord.controller");

const router = express.Router();

router.grt("/", protect, getDashboardData);

module.exports = router;
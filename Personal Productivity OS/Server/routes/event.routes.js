const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addEvent, getAllEvents, deleteEvent } = require("../controllers/event.controller");

const router = express.Router();

router.post("/addEvent", protect, addEvent);
router.get("/getAllEvents", protect, getAllEvents);
router.delete("/deleteEvent/:id", protect, deleteEvent);

module.exports = router;
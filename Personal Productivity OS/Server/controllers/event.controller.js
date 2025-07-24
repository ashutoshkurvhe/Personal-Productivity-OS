const Event = require("../models/Event");
const ical = require("ical.js");

// Import iCal feed & save events
exports.importICal = async (req, res) => {
  try {
    const { icalData, source } = req.body;

    if (!icalData || !source) {
      return res
        .status(400)
        .json({ message: "iCal data and source are required" });
    }

    const jcalData = ical.parse(icalData);
    const comp = new ical.Component(jcalData);
    const events = comp.getAllSubcomponents("vevent");

    for (const event of events) {
      const vevent = new ical.Event(event);
      await Event.updateOne(
        { externalId: vevent.uid, userId: req.user._id },
        {
          userId: req.user._id,
          source,
          title: vevent.summary,
          start: vevent.startDate.toJSDate(),
          end: vevent.endDate.toJSDate(),
          date: vevent.date.toJSDate(),
          externalId: vevent.uid,
        },
        { upsert: true }
      );
    }

    res.json({ message: `${events.length} events imported` });
  } catch (error) {
    console.error("Import iCal Error:", error.message);
    res.status(500).json({ message: "Failed to import calendar events" });
  }
};

// Get all calendar events
exports.getCalendarEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    res.json(events);
  } catch (error) {
    console.error("Get Calendar Events Error:", error.message);
    res.status(500).json({ message: "Failed to get calendar events" });
  }
};

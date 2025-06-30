const Event = require("../models/Event");
const ical = require("ical.js");


//Add Event
// Import iCal feed & save events
exports.importICal = async (req, res) => {
    const { icalData, source } = req.body; // iCal raw text
  
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
          externalId: vevent.uid,
        },
        { upsert: true }
      );
    }
  
    res.json({ message: `${events.length} events imported` });
  };
  
  // Get all calendar events
  exports.getCalendarEvents = async (req, res) => {
    const events = await Event.find({ userId: req.user._id });
    res.json(events);
  };
  
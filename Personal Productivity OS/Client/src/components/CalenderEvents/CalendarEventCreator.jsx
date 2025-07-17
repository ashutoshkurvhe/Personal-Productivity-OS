import React, { useState } from "react";
import ical from "ical-generator";
import { saveAs } from "file-saver";

const CalendarEventCreator = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleExportICS = () => {
    const cal = ical({ name: "My Kanban Calendar" });
    cal.createEvent({
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      summary: event.title,
      description: event.description,
      location: event.location,
    });

    const blob = new Blob([cal.toString()], {
      type: "text/calendar;charset=utf-8",
    });
    saveAs(blob, `${event.title || "event"}.ics`);
  };

  return (
    <div className="bg-white p-6 max-w-xl mx-auto mt-10 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">📅 Create Calendar Event</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="startDate"
          value={event.startDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="endDate"
          value={event.endDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={handleExportICS}
      >
        Export as .ics
      </button>
    </div>
  );
};

export default CalendarEventCreator;

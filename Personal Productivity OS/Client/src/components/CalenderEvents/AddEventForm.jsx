import { useState } from "react";
import { LuCalendar, LuFileText } from "react-icons/lu";

const AddEventForm = ({ onAddEvent, loading }) => {
  const [formData, setFormData] = useState({
    source: "google",
    title: "",
    description: "",
    start: "",
    end: "",
    externalId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.source ||
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.start ||
      !formData.end ||
      !formData.externalId.trim()
    ) {
      return;
    }
    onAddEvent(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Source Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calendar Source
        </label>
        <div className="flex gap-4">
          {["google", "apple"].map((src) => (
            <label className="flex items-center" key={src}>
              <input
                type="radio"
                name="source"
                value={src}
                checked={formData.source === src}
                onChange={handleChange}
                className="mr-2 text-black focus:ring-black"
              />
              <span className="text-sm capitalize">{src} Calendar</span>
            </label>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g. Team Meeting"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          placeholder="Brief description of the event"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />
      </div>

      {/* Start Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Time
        </label>
        <input
          type="datetime-local"
          name="start"
          value={formData.start}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />
      </div>

      {/* End Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Time
        </label>
        <input
          type="datetime-local"
          name="end"
          value={formData.end}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />
      </div>

      {/* External ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          External ID
        </label>
        <input
          type="text"
          name="externalId"
          value={formData.externalId}
          onChange={handleChange}
          required
          placeholder="e.g. 12345abcd"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />
      </div>

      {/* Info Box */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <LuFileText className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-gray-600">
            <p className="font-medium mb-1">Required Fields:</p>
            <ul className="space-y-1">
              <li>• Source: google or apple</li>
              <li>• Title: event name</li>
              <li>• Description: short details</li>
              <li>• Start/End: event timing</li>
              <li>• External ID: unique ID from calendar system</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <LuCalendar className="h-4 w-4" />
          )}
          {loading ? "Adding..." : "Add Event"}
        </button>
      </div>
    </form>
  );
};

export default AddEventForm;

import { useState } from "react";
import { LuUpload, LuCalendar, LuFileText } from "react-icons/lu";

const AddEventForm = ({ onAddEvent, loading }) => {
  const [formData, setFormData] = useState({
    icalData: "",
    source: "google",
  });
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.icalData.trim()) {
      return;
    }
    onAddEvent(formData);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/calendar" || file.name.endsWith(".ics")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData((prev) => ({
            ...prev,
            icalData: event.target.result,
          }));
        };
        reader.readAsText(file);
      }
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          icalData: event.target.result,
        }));
      };
      reader.readAsText(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Source Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calendar Source
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="source"
              value="google"
              checked={formData.source === "google"}
              onChange={handleChange}
              className="mr-2 text-black focus:ring-black"
            />
            <span className="text-sm">Google Calendar</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="source"
              value="apple"
              checked={formData.source === "apple"}
              onChange={handleChange}
              className="mr-2 text-black focus:ring-black"
            />
            <span className="text-sm">Apple Calendar</span>
          </label>
        </div>
      </div>

      {/* File Upload Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Import iCal File
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? "border-black bg-gray-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="icalFile"
            accept=".ics,.ical,text/calendar"
            onChange={handleFileInput}
            className="hidden"
          />
          <LuUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop your .ics file here, or{" "}
            <label
              htmlFor="icalFile"
              className="text-black hover:underline cursor-pointer font-medium"
            >
              browse
            </label>
          </p>
          <p className="text-xs text-gray-500">Supports .ics and .ical files</p>
        </div>
      </div>

      {/* Manual iCal Data Input */}
      <div>
        <label
          htmlFor="icalData"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Or Paste iCal Data
        </label>
        <textarea
          id="icalData"
          name="icalData"
          value={formData.icalData}
          onChange={handleChange}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none font-mono text-sm"
          placeholder="BEGIN:VCALENDAR&#10;VERSION:2.0&#10;PRODID:...&#10;&#10;Paste your iCal data here..."
        />
      </div>

      {/* Help Text */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <LuFileText className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-gray-600">
            <p className="font-medium mb-1">How to get iCal data:</p>
            <ul className="space-y-1">
              <li>
                • <strong>Google Calendar:</strong> Go to Settings → Import &
                Export → Export
              </li>
              <li>
                • <strong>Apple Calendar:</strong> File → Export → Export as
                .ics file
              </li>
              <li>
                • <strong>Outlook:</strong> File → Save Calendar → iCalendar
                format
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!formData.icalData.trim() || loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <LuCalendar className="h-4 w-4" />
          )}
          {loading ? "Importing..." : "Import Events"}
        </button>
      </div>
    </form>
  );
};

export default AddEventForm;

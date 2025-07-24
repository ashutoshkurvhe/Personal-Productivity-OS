import { useState } from "react";
import { LuCalendar, LuClock, LuExternalLink } from "react-icons/lu";

const EventList = ({ events }) => {
  const [sortBy, setSortBy] = useState("start");
  const [filterBy, setFilterBy] = useState("all");

  // Sort events
  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === "start") {
      return new Date(a.start) - new Date(b.start);
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Filter events
  const filteredEvents = sortedEvents.filter((event) => {
    if (filterBy === "all") return true;
    return event.source === filterBy;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isUpcoming = (startDate) => {
    return new Date(startDate) > new Date();
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <LuCalendar className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by importing your calendar events.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4">
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="start">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="all">All Sources</option>
            <option value="google">Google Calendar</option>
            <option value="apple">Apple Calendar</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Showing {filteredEvents.length} of {events.length} events
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
              isUpcoming(event.start)
                ? "border-l-4 border-l-black"
                : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
                    {event.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      event.source === "google"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-black text-white"
                    }`}
                  >
                    {event.source}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <LuCalendar className="h-4 w-4" />
                    <span>{formatDate(event.start)}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <LuClock className="h-4 w-4" />
                    <span>
                      {formatTime(event.start)} - {formatTime(event.end)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isUpcoming(event.start) && (
                  <span className="px-2 py-1 text-xs bg-black text-white rounded-full">
                    Upcoming
                  </span>
                )}
                <LuExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;

import React from "react";
import UpcomingEventsCard from "../Cards/UpcomingEventsCard";

const UpcomingEvents = ({ dashboardData }) => {
  const { upcomingEvents } = dashboardData;
  // console.log(dashboardData)
  return (
    <div className="mt-5 p-4 h-full rounded-2xl shadow-md bg-gray-00">
      <div>
        <h1 className="text-xl text-black font-medium mt-5 p-4">
          Upcoming Events
        </h1>
        {upcomingEvents?.map((event) => (
          <UpcomingEventsCard
            key={event._id}
            title={event.title}
            stastTime={event.start}
            date={event.date}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;

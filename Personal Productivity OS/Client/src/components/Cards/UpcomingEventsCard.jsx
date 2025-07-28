import React from "react";

const UpcomingEventsCard = ({ title, startTime }) => {
  return (
    <div className="flex flex-col justify-between bg-white border-1 border-gray-200 pt-4 px-4 md:pt-4 md:pl-4 md:pr-0 rounded-2xl shadow-md shadow-gray-200 mb-4
     h-[100px] md:h-[100px] overflow-x-hidden">
      <h1 className="texe-xl">{title}</h1>
      <div className="flex self-end md:flex-row px-2  bg-black rounded-t-4xl md:rounded-l-full">
        <p className="text-sm px-2 py-1 rounded-full text-white">
          Start -
          <span className="ml-1">
            {new Date(startTime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </p>
        <p className="text-sm px-2 py-1 rounded-full text-white">
          End -
          <span className="ml-1">
            {new Date(startTime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UpcomingEventsCard;

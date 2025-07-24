import React from 'react'

const UpcomingEventsCard = ({ title, start }) => {
  return (
    <div className='flex justify-between card mb-4'>
      <h1 className="texe-xl">{title}</h1>
      <p className="text-sm text-gray">
        {new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
}

export default UpcomingEventsCard

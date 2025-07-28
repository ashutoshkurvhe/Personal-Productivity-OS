import React from 'react'

const RecentTaskCard = ({ title, description, dueDate, priority, taskStatus }) => {
  return (
    <div className="card m-2">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-5">
          <h1 className="text-xl">{title}</h1>
          <div>
            <span className="text-sm bg-slate-300/50 mr-1 px-2 py-1 rounded-xl text-gray-800">
              {taskStatus}
            </span>
            <span className="text-sm bg-red-200/50 mr-1 px-2 py-1 rounded-xl text-red-800">
              {priority}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 ">{description}</p>
        <div className="self-end">
          <p className="justify-self-end text-sm text-white rounded-2xl px-2 py-1 bg-black ">
            {new Date(dueDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecentTaskCard

import React from 'react'
import RecentTaskCard from '../Cards/RecentTaskCard';

const RecentTasks = ({ dashboardData }) => {
    const {recentTasks} = dashboardData;
  return (
      <div className="mt-5">
          <h1 className="text-xl p-5">Recent Tasks</h1>
          {recentTasks?.map((task) => (
              <RecentTaskCard key={task._id} title={task.title} description={task.description} dueDate={task.dueDate} priority={task.priority} taskStatus={task.taskStatus} />
          ))}
      </div>
  )
}

export default RecentTasks

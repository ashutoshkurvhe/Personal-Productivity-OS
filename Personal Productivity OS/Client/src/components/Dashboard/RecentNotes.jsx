import React from "react";
import RecentNotesCard from "../Cards/RecentNotesCard";

const RecentNotes = ({ dashboardData }) => {
  const { recentNotes } = dashboardData;
  return (
    <div className="mt-5">
      <h1 className="text-xl p-5">Recent Notes</h1>
      {recentNotes?.map((note) => (
        <RecentNotesCard
          key={note._id}
          title={note.title}
              content={note.content}
              type={note.type}
              taskStatus={note.taskStatus}
              tags={note.tags}
          summary={note.summary}
          createdAt={note.createdAt}
        />
      ))}
    </div>
  );
};

export default RecentNotes;

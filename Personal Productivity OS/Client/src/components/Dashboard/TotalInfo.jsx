import React from "react";
import Card from "../Cards/Card";
import { FaRegNoteSticky } from "react-icons/fa6";
import { CgGoogleTasks } from "react-icons/cg";
import { GoProjectSymlink } from "react-icons/go";

const TotalInfo = ({ dashboardData }) => {
    const {totalTasks, totalNotes, totalProjects} = dashboardData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
      <Card
        label="Total Notes"
        icon={<FaRegNoteSticky />}
        value={totalNotes}
        color="bg-pink-200/50"
      />
      <Card
        label="Total Tasks"
        icon={<CgGoogleTasks />}
        color="bg-yellow-200/50"
        value={totalTasks}
      />
      <Card
        label="Total Projects"
        icon={<GoProjectSymlink />}
        color="bg-emerald-200/50"
        value={totalProjects}
      />
    </div>
  );
};

export default TotalInfo;

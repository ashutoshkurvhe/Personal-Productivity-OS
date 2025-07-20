import Card from "../Cards/Card";
 import { MdDone } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { SiStagetimer } from "react-icons/si";

const PomodoroStats = ({ stats,sessionsCompleted }) => {
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
      <Card label="Sessions Completed" icon={<MdDone />} value={sessionsCompleted} />
      <Card label="Total Sessions" icon={<CiTimer />} value={stats.totalSessions} />
      <Card label="Total Time" icon={<SiStagetimer />} value={`${stats.totalTime} minutes`} />
    </div>
  );
}

export default PomodoroStats

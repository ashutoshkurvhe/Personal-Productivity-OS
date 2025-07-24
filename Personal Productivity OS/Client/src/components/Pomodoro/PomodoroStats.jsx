import Card from "../Cards/Card";
import { MdDone } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { SiStagetimer } from "react-icons/si";

const PomodoroStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
      <Card
        label="Sessions Today"
        icon={<MdDone />}
        color="bg-pink-200/50"
        value={stats.sessionsToday}
      />
      <Card
        label="Total Sessions"
        icon={<CiTimer />}
        color="bg-yellow-200/50"
        value={stats.sessionsCompleted}
      />
      <Card
        label="Total Time"
        icon={<SiStagetimer />}
        color="bg-emerald-200/50"
        value={`${stats.totalTime} minutes`}
      />
    </div>
  );
};

export default PomodoroStats;

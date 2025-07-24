import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TotalInfo from "../../components/Dashboard/TotalInfo";
import RecentNotes from "../../components/Dashboard/RecentNotes";
import RecentTasks from "../../components/Dashboard/RecentTasks";
import UpcomingEvents from "../../components/Dashboard/UpcomingEvents";
import PomodoroTimer from "../../components/Pomodoro/PomodoroTimer"; // 

import { CiPlay1, CiPause1 } from "react-icons/ci"; // 
import { MdOutlineRestartAlt } from "react-icons/md"; // 

const Home = () => {
  useUserAuth();
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  //Pomodoro Timer Logic (copied from PomodoroPage)
  const DEFAULT_DURATION = 25 * 60;
  const [totalTime, setTotalTime] = useState(DEFAULT_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && totalTime > 0) {
      timer = setInterval(() => {
        setTotalTime((prev) => prev - 1);
      }, 1000);
    }

    if (totalTime === 0 && isRunning) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, totalTime]);

  const buttons = {
    start: {
      label: "Start",
      icon: <CiPlay1 />,
      handleStart: () => setIsRunning(true),
    },
    stop: {
      label: "Stop",
      icon: <CiPause1 />,
      handlePause: () => setIsRunning(false),
    },
    reset: {
      label: "Reset",
      icon: <MdOutlineRestartAlt />,
      handleReset: () => {
        setIsRunning(false);
        setTotalTime(DEFAULT_DURATION);
      },
    },
  };

  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  return (
    <DashboardLayout>
      <div className="flex flex-col px-4 py-6">
        <h1 className="text-2xl font-medium mt-2">Dashboard</h1>
        <p className="text-md text-gray-600">
          Your personal productivity space.
        </p>
      </div>

      <div>
        <TotalInfo dashboardData={dashboardData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <UpcomingEvents dashboardData={dashboardData} />
        <PomodoroTimer
          buttons={buttons}
          isRunning={isRunning}
          minutes={minutes}
          seconds={seconds}
        />
      </div>
      <div>
        <RecentTasks dashboardData={dashboardData} />
      </div>

      <div>
        <RecentNotes dashboardData={dashboardData} />
      </div>
    </DashboardLayout>
  );
};

export default Home;

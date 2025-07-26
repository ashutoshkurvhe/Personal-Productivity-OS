import { useState, useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PomodoroTimer from "../../components/Pomodoro/PomodoroTimer";
import PomodoroStats from "../../components/Pomodoro/PomodoroStats";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { MdOutlineRestartAlt } from "react-icons/md";

const PomodoroPage = () => {
  useUserAuth();

  const DEFAULT_DURATION = 25 * 60; // 25 minutes
  const [totalTime, setTotalTime] = useState(DEFAULT_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState(null);

  // Countdown logic
  useEffect(() => {
    let timer;
    if (isRunning && totalTime > 0) {
      timer = setInterval(() => {
        setTotalTime((prev) => prev - 1);
      }, 1000);
    }

    if (totalTime === 0 && isRunning) {
      setIsRunning(false);
      savePomodoroSession();
    }

    return () => clearInterval(timer);
  }, [isRunning, totalTime]);

  // Save completed session
  const savePomodoroSession = async () => {
    try {
      await axiosInstance.post(API_PATHS.POMODORO.SAVE_SESSION, {
        duration: Math.floor((DEFAULT_DURATION - totalTime) / 60), // minutes completed
        completedAt: new Date(),
      });
      fetchStats();
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  };

  // Get stats from backend
  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.POMODORO.GET_STATS);
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

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
      <div className="py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium">Pomodoro</h1>
        </div>

        <PomodoroTimer
          buttons={buttons}
          isRunning={isRunning}
          minutes={minutes}
          seconds={seconds}
        />

        <PomodoroStats stats={stats} />
      </div>
    </DashboardLayout>
  );
};

export default PomodoroPage;

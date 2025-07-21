import { useState, useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PomodoroTimer from "../../components/Pomodoro/PomodoroTimer";
import PomodoroStats from "../../components/Pomodoro/PomodoroStats";

const PomodoroPage = () => {
  useUserAuth();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          clearInterval(timer);
          setIsRunning(false);
          setSessionsCompleted((prev) => prev + 1);
          savePomodoroSession();
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  const savePomodoroSession = async () => {
    try {
      await axiosInstance.post(API_PATHS.POMODORO.SAVE_SESSION, {
        duration: 25,
        timestamp: new Date(),
      });
      fetchStats();
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  };

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
      icon: "",
      handleStart : () => setIsRunning(true)
    },
    stop: {
      label: "Stop",
      icon: "",
      handleStop : () => setIsRunning(false)
    },
    reset: {
      label: "Reset",
      icon: "",
      handleReset: () => {
  setIsRunning(false);
  setMinutes(25);
  setSeconds(0);
}

    }
  }

  return (
    <DashboardLayout>
      <div className="px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium">Pomodoro</h1>
        </div>
        <PomodoroTimer buttons={buttons} isRunning={isRunning}  minutes={minutes} seconds={seconds} />
        
        <PomodoroStats stats={stats} sessionsCompleted={sessionsCompleted} />
          
        </div>
    </DashboardLayout>
  );
};

export default PomodoroPage;

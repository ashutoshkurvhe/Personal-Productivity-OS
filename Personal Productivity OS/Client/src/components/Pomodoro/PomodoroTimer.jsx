import React from "react";

const PomodoroTimer = ({ isRunning, buttons={}, minutes, seconds }) => {
  const { start={}, stop={}, reset={} } = buttons;
  console.log(buttons)

  return (
    <div className="w-full p-5 my-6 text-center h-full bg-gray-50 shadow-md border-1 border-gray-200 rounded-xl">
      <h1 className="text-center text-3xl font-medium mb-5">Timer</h1>
      <div className="text-6xl font-mono text-black mb-6">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      <div className="flex justify-center gap-5">
        <button
          onClick={start.handleStart}
          disabled={isRunning}
          className="flex items-center gap-2 px-6 py-2 bg-black text-white hover:bg-gray-400/50 font-semibold rounded-md"
        >
          {start.icon}
          <span className="hidden md:flex">{start.label}</span>
        </button>
        <button
          onClick={stop.handlePause}
          disabled={!isRunning}
          className="flex items-center gap-2 px-6 py-2 bg-black text-white hover:bg-gray-400/50 font-semibold rounded-md"
        >
          {stop.icon}
          <span className="hidden md:flex">{stop.label}</span>
        </button>
        <button
          onClick={reset.handleReset}
          className="flex items-center gap-2 px-6 py-2 bg-black text-white hover:bg-gray-400/50 font-semibold rounded-md"
        >
          {reset.icon}
          <span className="hidden md:flex">{reset.label}</span>
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;

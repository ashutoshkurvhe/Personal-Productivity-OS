import React from 'react'

const PomodoroTimer = ({ isRunning, buttons, minutes, seconds }) => {
    const { start, stop, reset } = buttons;
  return (
    <div className="w-full p-8 my-6 text-center bg-gray-50 shadow-md border-1 border-gray-200 rounded-xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Pomodoro Timer
      </h1>
      <div className="text-6xl font-mono text-black mb-6">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      <div className="space-x-4">
        <button
          onClick={start.handleStart}
          disabled={isRunning}
          className="px-6 py-2 bg-green-400/50 hover:bg-green-500/50 text-black font-semibold rounded-xl"
        >
          {start.label}
        </button>
        <button
          onClick={stop.handlePause}
          disabled={!isRunning}
          className="px-6 py-2 bg-yellow-400/50 hover:bg-yellow-500/50 text-black font-semibold rounded-xl"
        >
          {stop.label}
        </button>
        <button
          onClick={reset.handleReset}
          className="px-6 py-2 bg-gray-400/50 hover:bg-gray-500/50 text-black font-semibold rounded-xl"
        >
          {reset.label}
        </button>
      </div>
    </div>
  );
}

export default PomodoroTimer

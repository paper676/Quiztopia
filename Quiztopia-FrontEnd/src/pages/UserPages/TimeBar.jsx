import React, { useEffect, useState } from "react";

function TimeBar() {
    const totalTime = 120;
    const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const percentage = (timeLeft / totalTime) * 100;
  return (
    <div className="sticky top-0 z-20 bg-white px-6 py-3 flex justify-between items-center">
      <p className="text-lg font-semibold text-gray-800 flex items-center gap-1">
        ⏳ <span className="text-gray-700">Time Left:</span>{" "}
        <span className="text-red-500">
          {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
        </span>
      </p>
      <div className="w-44 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 ease-linear"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default TimeBar

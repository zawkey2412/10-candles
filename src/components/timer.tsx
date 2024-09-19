import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimerProps {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
  hasStarted: boolean;
  isPaused: boolean;
}

const Timer: React.FC<TimerProps> = ({
  duration,
  isActive,
  onComplete,
  hasStarted,
  isPaused,
}) => {
  const [height, setHeight] = useState(40); // Candle starts at full height
  const [isSnuffed, setIsSnuffed] = useState(false); // Tracks if candle is snuffed
  const [remainingTime, setRemainingTime] = useState(duration * 60); // Remaining time in seconds

  useEffect(() => {
    setRemainingTime(duration * 60); // Reset remaining time when duration changes
  }, [duration]);

  useEffect(() => {
    if (isActive && !isSnuffed && !isPaused) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 0) {
            const newTime = prevTime - 1;
            setHeight((newTime / (duration * 60)) * 40); // Update height based on remaining time
            return newTime;
          } else {
            clearInterval(interval);
            setIsSnuffed(true); // Snuff out the flame when the timer completes
            onComplete();
            return 0;
          }
        });
      }, 1000); // Update every second
      return () => clearInterval(interval);
    }
  }, [isActive, isSnuffed, isPaused, duration, onComplete]);

  const handleSnuffOut = () => {
    if (isActive) {
      setIsSnuffed(true);
      setHeight(0); // Instantly snuff out candle
      setRemainingTime(0); // Set remaining time to 0
      onComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const flameVariants = {
    initial: {
      opacity: 0,
      y: 0,
    },
    active: {
      opacity: [1, 0.8, 1],
      y: [0, -10, 0],
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
    snuffed: {
      opacity: [1, 0.5, 0],
      y: [0, -5, -10],
      scale: [1, 0.8, 0.5],
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex flex-col items-center" onClick={handleSnuffOut}>
      {/* Flame */}
      <motion.div
        className="relative w-6 h-2"
        style={{ bottom: `${height}px` }} // Dynamically position flame above shrinking candle
        variants={flameVariants}
        animate={isSnuffed ? "snuffed" : hasStarted ? "active" : "initial"}
      >
        {/* Three layers of flame for a realistic effect */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-yellow-400 clip-path-flame"></div>
        <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-yellow-300 clip-path-flame"></div>
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-yellow-200 clip-path-flame"></div>
      </motion.div>

      {/* Candle container to control body shrinkage */}
      <div className="relative flex justify-center w-6 h-[40px] rounded-t-md">
        {/* Candle body, fixed to bottom, shrinks down */}
        <motion.div
          className="absolute bottom-2 w-4 bg-gray-300"
          style={{ height: `${height}px` }}
          animate={{ height: `${height}px` }}
          transition={{ duration: 0.5 }}
        ></motion.div>

        {/* Candle base */}
        <div className="absolute bottom-0 w-full h-2 bg-gray-500 mt-0 rounded-t-md"></div>
      </div>

      {/* Countdown display */}
      <div className="mt-2 text-center text-gray-700">
        {formatTime(remainingTime)}
      </div>
    </div>
  );
};

export default Timer;
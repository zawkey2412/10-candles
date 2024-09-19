import React, { useState } from "react";
import { FaBars, FaUser } from "react-icons/fa"; // Import the user icon
import { AnimatePresence, motion } from "framer-motion"; // Import Framer Motion
import Timer from "./components/timer";
import TruthInput from "./components/truthsInput";
import Modal from "./components/modal";
import TruthsList from "./components/truthsList";
import PlayersTracker from "./components/PlayersTracker";

function App() {
  const [currentCandle, setCurrentCandle] = useState(9); // Start from the last candle
  const [isStarted, setIsStarted] = useState(false);
  const [truths, setTruths] = useState<string[][]>(Array(10).fill([]));
  const [showTruthInput, setShowTruthInput] = useState(false);
  const [isMelting, setIsMelting] = useState(false);
  const [candleDuration, setCandleDuration] = useState<number>(1);
  const [customDuration, setCustomDuration] = useState<number>(1);
  const [customFirstField, setCustomFirstField] = useState("");
  const [customLastField, setCustomLastField] = useState("");
  const [useCustomFirstField, setUseCustomFirstField] = useState(false);
  const [useCustomLastField, setUseCustomLastField] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showTruths, setShowTruths] = useState(false); // State to toggle TruthsList visibility
  const [showPlayersTracker, setShowPlayersTracker] = useState(false); // State to toggle PlayersTracker visibility

  const handleCandleComplete = () => {
    setIsMelting(false);
    setCurrentCandle((prev) => {
      const newCandle = prev - 1;
      if (newCandle === 0 && truths[9 - newCandle].length === 0) {
        setShowTruthInput(true);
      }
      return newCandle;
    });
  };

  const handleStart = () => {
    setIsStarted(true);
    if (truths[9].length === 0) {
      setShowTruthInput(true);
    }
  };

  const handleTruthSubmit = (newTruths: string[]) => {
    if (useCustomFirstField) {
      newTruths[0] = customFirstField;
    }
    if (useCustomLastField) {
      newTruths[newTruths.length - 1] = customLastField;
    }
    setTruths((prevTruths) => {
      const updatedTruths = [...prevTruths];
      updatedTruths[9 - currentCandle] = newTruths;
      return updatedTruths;
    });
    setShowTruthInput(false);
    setIsMelting(true);
  };

  const handleWriteTruths = () => {
    setShowTruthInput(true);
  };

  const handleCloseModal = () => {
    setShowTruthInput(false);
  };

  const handleSkip = () => {
    setShowTruthInput(false);
    setIsMelting(true);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const duration = Number(e.target.value);
    setCustomDuration(duration);
  };

  const handleSetDuration = () => {
    setCandleDuration(customDuration);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const toggleTruthsList = () => {
    setShowTruths((prev) => !prev);
    setShowPlayersTracker(false);
  };

  const togglePlayersTracker = () => {
    setShowPlayersTracker((prev) => !prev);
    setShowTruths(false);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          10 Candles Tracker
        </h1>
        <p className="text-base text-gray-700">
          Set your candles and write truths as they melt.
        </p>
      </header>

      {!isStarted && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Customize Truth Fields
          </h3>
          <div className="mb-3">
            <label className="flex items-center text-gray-800">
              <input
                type="checkbox"
                checked={useCustomFirstField}
                onChange={(e) => setUseCustomFirstField(e.target.checked)}
                className="mr-2"
              />
              Fill the first field with:
              <input
                type="text"
                value={customFirstField}
                onChange={(e) => setCustomFirstField(e.target.value)}
                disabled={!useCustomFirstField}
                className="ml-2 px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="flex items-center text-gray-800">
              <input
                type="checkbox"
                checked={useCustomLastField}
                onChange={(e) => setUseCustomLastField(e.target.checked)}
                className="mr-2"
              />
              Fill the last field with:
              <input
                type="text"
                value={customLastField}
                onChange={(e) => setCustomLastField(e.target.value)}
                disabled={!useCustomLastField}
                className="ml-2 px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
      )}

      <div className="mb-6 text-center">
        {!isStarted && (
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Set Candle Duration (in Minutes)
              </h3>
              <div className="flex items-center">
                <input
                  type="number"
                  value={customDuration}
                  onChange={handleDurationChange}
                  min="1"
                  className="px-2 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={handleSetDuration}
                  className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition"
                >
                  Set Duration
                </button>
              </div>
            </div>
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition"
            >
              Start Candles
            </button>
          </div>
        )}
        {isStarted && (
          <div className="flex gap-4">
            <button
              onClick={handleWriteTruths}
              className={`px-4 py-2 rounded-md shadow-sm transition ${
                isMelting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
              disabled={isMelting}
            >
              Write Truths
            </button>
            {isMelting && !isPaused && (
              <button
                onClick={handlePause}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md shadow-sm hover:bg-yellow-700 transition"
              >
                Pause
              </button>
            )}
            {isMelting && isPaused && (
              <button
                onClick={handleResume}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition"
              >
                Resume
              </button>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={showTruthInput}
        onClose={handleCloseModal}
        onSkip={handleSkip}
      >
        <TruthInput
          numTruths={currentCandle + 1}
          onSubmit={handleTruthSubmit}
          customFirstField={useCustomFirstField ? customFirstField : undefined}
          customLastField={useCustomLastField ? customLastField : undefined}
        />
      </Modal>

      <div className="flex flex-wrap justify-center mb-4 mt-12 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="relative">
            <Timer
              duration={candleDuration}
              isActive={isStarted && index === currentCandle && isMelting}
              onComplete={handleCandleComplete}
              hasStarted={isStarted}
              isPaused={isPaused} // Pass the isPaused state
            />
          </div>
        ))}
      </div>

           {/* Navbar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-md shadow-md">
        <div className="flex items-center gap-5 justify-between">
          <button
            onClick={toggleTruthsList}
            className={`px-4 py-2 rounded-md transition ${
              showTruths ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            <FaBars className="inline-block mr-2" />
            Truths
          </button>
          <button
            onClick={togglePlayersTracker}
            className={`px-4 py-2 rounded-md transition ${
              showPlayersTracker ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            <FaUser className="inline-block mr-2" /> {/* User icon */}
            Players
          </button>
        </div>
      </div>
      
            {/* Framer Motion animation for TruthsList */}
      <AnimatePresence>
        {showTruths && (
          <motion.div
            key="truthsList"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 mx-auto w-fit bg-white p-4 rounded-md shadow-md"
          >
            <div className="flex w-full items-end">
              <button
                onClick={() => setShowTruths(false)}
                className="items-end text-red-600 hover:text-red-800 transition"
              >
                x
              </button>
            </div>
            <TruthsList truths={truths} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Framer Motion animation for PlayersTracker */}
      <AnimatePresence>
        {showPlayersTracker && (
          <motion.div
            key="playersTracker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 mx-auto w-fit bg-white p-4 rounded-md shadow-md"
          >
            <div className="flex w-full items-end">
              <button
                onClick={() => setShowPlayersTracker(false)}
                className="text-red-600 hover:text-red-800 transition"
              >
                x
              </button>
            </div>
            <PlayersTracker />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

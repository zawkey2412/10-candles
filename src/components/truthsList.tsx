import React, { useState } from "react";

interface TruthsListProps {
  truths: string[][];
}

const TruthsList: React.FC<TruthsListProps> = ({ truths }) => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-fit max-w-full overflow-hidden">
      <h3 className="text-lg font-semibold mb-4 text-black">Truths</h3>
      <div className="flex mb-4 border-b border-gray-300 overflow-x-auto">
        <div className="flex flex-nowrap">
          {truths.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 transition-colors duration-300 whitespace-nowrap focus:outline-none ${
                activeTab === index
                  ? "bg-blue-500 text-white border-t border-l border-r border-blue-500 rounded-t"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              Scene {10 - index}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 bg-gray-100 rounded-b overflow-y-auto max-h-96">
        <ul className="list-none list-inside text-black">
          {truths[activeTab].map((truth, i) => (
            <li key={i} className="ml-4 mb-1">
              {i + 1}. {truth}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TruthsList;
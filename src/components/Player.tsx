import React, { useState } from 'react';

interface PlayerProps {
  index: number;
  name: string;
  realName: string;
  vice: string;
  virtue: string;
  moment: string;
  brink: string;
  onChange: (index: number, field: string, value: string) => void;
}

const Player: React.FC<PlayerProps> = ({
  index,
  name,
  realName,
  vice,
  virtue,
  moment,
  brink,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUsed, setIsUsed] = useState({
    vice: false,
    virtue: false,
    moment: false,
    brink: false,
  });
  const [inUse, setInUse] = useState({
    moment: false,
    brink: false,
  });

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(index, field, e.target.value);
  };

  const toggleEditMode = () => setIsEditing(!isEditing);

  const handleUse = (field: string) => () => {
    if (field === 'moment' || field === 'brink') {
      if (!inUse[field as keyof typeof inUse] && !isUsed[field as keyof typeof isUsed]) {
        setInUse((prev) => ({
          ...prev,
          [field]: true,
        }));
      } else if (inUse[field as keyof typeof inUse]) {
        setIsUsed((prev) => ({
          ...prev,
          [field]: true,
        }));
        setInUse((prev) => ({
          ...prev,
          [field]: false,
        }));
      } else {
        setIsUsed((prev) => ({
          ...prev,
          [field]: false,
        }));
      }
    } else {
      setIsUsed((prev) => ({
        ...prev,
        [field]: !prev[field as keyof typeof prev],
      }));
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col">
      {isEditing ? (
        <>
          <div className="mb-2">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleChange("name")}
              className="px-2 py-1 border border-gray-300 rounded-sm w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Real Name:</label>
            <input
              type="text"
              value={realName}
              onChange={handleChange("realName")}
              className="px-2 py-1 border border-gray-300 rounded-sm w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Vice:</label>
            <input
              type="text"
              value={vice}
              onChange={handleChange("vice")}
              className="px-2 py-1 border border-gray-300 rounded-sm w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Virtue:</label>
            <input
              type="text"
              value={virtue}
              onChange={handleChange("virtue")}
              className="px-2 py-1 border border-gray-300 rounded-sm w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Moment:</label>
            <input
              type="text"
              value={moment}
              onChange={handleChange("moment")}
              className="px-2 py-1 border border-gray-300 rounded-sm w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Brink:</label>
            <input
              type="text"
              value={brink}
              onChange={handleChange("brink")}
              className="px-2 py-1 border border-gray-300 rounded-sm w-full"
            />
          </div>
        </>
      ) : (
        <>
          <div className="mb-2">
            <h4 className="text-xl font-semibold">{name || "Player Name"}</h4>
            <p className="text-sm text-gray-500">{realName || "Real Name"}</p>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex-1">
                <span className={`mr-2 ${isUsed.vice ? 'line-through text-gray-500' : ''}`}>
                  Vice: {vice || "Default Vice"}
                </span>
                {isUsed.vice && <span className="text-red-500">Used</span>}
              </div>
              {!isEditing && (
                <button
                  onClick={handleUse("vice")}
                  className="px-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition"
                >
                  {isUsed.vice ? 'Used' : 'Use'}
                </button>
              )}
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex-1">
                <span className={`mr-2 ${isUsed.virtue ? 'line-through text-gray-500' : ''}`}>
                  Virtue: {virtue || "Default Virtue"}
                </span>
                {isUsed.virtue && <span className="text-red-500">Used</span>}
              </div>
              {!isEditing && (
                <button
                  onClick={handleUse("virtue")}
                  className="px-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition"
                >
                  {isUsed.virtue ? 'Used' : 'Use'}
                </button>
              )}
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex-1">
                <span className={`mr-2 ${isUsed.moment ? 'line-through text-gray-500' : ''}`}>
                  Moment: {moment || "Default Moment"}
                </span>
                {isUsed.moment && <span className="text-red-500">Used</span>}
              </div>
              {!isEditing && (
                <button
                  onClick={handleUse("moment")}
                  className="px-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition"
                >
                  {isUsed.moment ? 'Used' : inUse.moment ? 'In Use' : 'Use'}
                </button>
              )}
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex-1">
                <span className={`mr-2 ${isUsed.brink ? 'line-through text-gray-500' : ''}`}>
                  Brink: {brink || "Default Brink"}
                </span>
                {isUsed.brink && <span className="text-red-500">Used</span>}
              </div>
              {!isEditing && (
                <button
                  onClick={handleUse("brink")}
                  className="px-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition"
                >
                  {isUsed.brink ? 'Used' : inUse.brink ? 'In Use' : 'Use'}
                </button>
              )}
            </div>
          </div>
        </>
      )}
      <button
        onClick={toggleEditMode}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default Player;
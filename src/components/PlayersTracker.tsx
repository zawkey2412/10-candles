import React, { useState } from 'react';
import Player from './Player';

const defaultPlayers = 4;
const maxPlayers = 7;

const PlayersTracker: React.FC = () => {
  const [numPlayers, setNumPlayers] = useState(defaultPlayers);
  const [players, setPlayers] = useState(
    Array.from({ length: maxPlayers }, () => ({
      name: '',
      realName: '',
      vice: '',
      virtue: '',
      moment: '',
      brink: '',
    }))
  );

  const handlePlayerChange = (index: number, field: string, value: string) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
      return updatedPlayers;
    });
  };

  const handleNumPlayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= maxPlayers) {
      setNumPlayers(value);
    }
  };

  return (
    <div className="players-tracker bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Players Tracker</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Number of Players:</label>
        <input
          type="number"
          value={numPlayers}
          onChange={handleNumPlayersChange}
          min="1"
          max={maxPlayers}
          className="px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {players.slice(0, numPlayers).map((player, index) => (
          <Player
            key={index}
            index={index}
            name={player.name}
            realName={player.realName}
            vice={player.vice}
            virtue={player.virtue}
            moment={player.moment}
            brink={player.brink}
            onChange={handlePlayerChange}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayersTracker;

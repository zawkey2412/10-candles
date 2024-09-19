import React, { useState, useEffect } from "react";

interface TruthInputProps {
  numTruths: number;
  onSubmit: (truths: string[]) => void;
  customFirstField?: string;
  customLastField?: string;
}

const TruthInput: React.FC<TruthInputProps> = ({ numTruths, onSubmit, customFirstField, customLastField }) => {
  const [truths, setTruths] = useState<string[]>(Array(numTruths).fill(""));

  useEffect(() => {
    setTruths(Array(numTruths).fill(""));
  }, [numTruths]);

  const handleChange = (index: number, value: string) => {
    const newTruths = [...truths];
    newTruths[index] = value;
    setTruths(newTruths);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTruths = [...truths];
    if (customFirstField) {
      finalTruths[0] = customFirstField;
    }
    if (customLastField) {
      finalTruths[finalTruths.length - 1] = customLastField;
    }
    if (finalTruths.every((truth) => truth.trim())) {
      onSubmit(finalTruths);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {truths.map((truth, index) => (
        <div key={index}>
          {index === 0 && customFirstField ? (
            <div className="text-gray-800">{customFirstField}</div>
          ) : index === numTruths - 1 && customLastField ? (
            <div className="text-gray-800">{customLastField}</div>
          ) : (
            <input
              type="text"
              value={truth}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Enter truth ${index + 1}`}
              className="w-full px-4 py-2 border rounded"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default TruthInput;
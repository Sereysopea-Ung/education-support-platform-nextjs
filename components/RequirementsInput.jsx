import { useState } from "react";
import { FaMinusCircle } from "react-icons/fa";

export default function RequirementsInput() {
  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState("");

  const handleAddRequirement = () => {
    if (newRequirement.trim() !== "") {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updated = [...requirements];
    updated.splice(index, 1);
    setRequirements(updated);
  };

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Requirements
      </label>

      {/* Input for adding new requirements */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter requirement..."
          value={newRequirement}
          onChange={(e) => setNewRequirement(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#374151]"
        />
        <button
          onClick={handleAddRequirement}
          className="text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Add Requirement
        </button>
      </div>

      <ul className="mt-3">
        {requirements.map((req, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md"
          >
            <span className="text-gray-700">{req}</span>
            <FaMinusCircle
              className="text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => handleRemoveRequirement(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

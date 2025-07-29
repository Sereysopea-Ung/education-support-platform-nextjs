import { useState } from "react";
import { FaMinusCircle } from "react-icons/fa";

export default function BenefitsInput() {
  const [benefits, setBenefits] = useState([]);
  const [newBenefit, setNewBenefit] = useState("");

  const handleAddBenefit = () => {
    if (newBenefit.trim() !== "") {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index) => {
    const updated = [...benefits];
    updated.splice(index, 1);
    setBenefits(updated);
  };

  return (
    <div className="py-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Benefits
      </label>

      { /* Input for adding new benefits */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter benefit..."
          value={newBenefit}
          onChange={(e) => setNewBenefit(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  text-[#374151]"
        />
        <button
          onClick={handleAddBenefit}
          className="text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Add Benefit
        </button>
      </div>

      <ul className="mt-3">
        {benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md"
          >
            <span className="text-gray-700">{benefit}</span>
            <FaMinusCircle
              className="text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => handleRemoveBenefit(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

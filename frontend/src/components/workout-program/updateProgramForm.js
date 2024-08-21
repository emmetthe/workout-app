import React, { useState, useEffect } from 'react';

const UpdateProgramForm = ({ workout, onUpdate, showUpdateForm }) => {
  const { name, description, days } = workout;
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  // Create a state variable for selected days
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    // When the component mounts or initialDays changes, update selectedDays
    setSelectedDays(days.map((day) => day.dayName));
  }, [days]);

  const handleCheckboxChange = (dayName) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(dayName)) {
        return prevSelectedDays.filter((day) => day !== dayName);
      } else {
        return [...prevSelectedDays, dayName];
      }
    });
  };

  const handleUpdate = () => {
    onUpdate({
      ...workout,
      name: updatedName,
      description: updatedDescription,
      days: selectedDays
    });
    showUpdateForm();
  };

  return (
    <div className="flex flex-col items-center mt-10 mx-auto w-full max-w-md">
      <label htmlFor="programName" className="mb-3 text-white-700 text-lg">
        Program Name
      </label>
      <input
        type="text"
        placeholder="Program Name"
        id="programName"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
      />

      <label htmlFor="description" className="mb-3 text-white-700 text-lg">
        Description
      </label>
      <textarea
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        placeholder="Enter a description"
        className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
        rows={4}
      />

      <div className="mb-4 text-center">
        <p className="mb-2 font-semibold">Days:</p>
        <div className="flex flex-col items-start">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <label key={day} className="flex items-center mb-2">
              <input type="checkbox" checked={selectedDays.includes(day)} onChange={() => handleCheckboxChange(day)} className="mr-2" />
              {day}
            </label>
          ))}
        </div>
      </div>

      <button onClick={handleUpdate} className="w-1/2 py-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Update Program
      </button>

      <button onClick={showUpdateForm} className="w-1/2 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
        Cancel
      </button>
    </div>
  );
};

export default UpdateProgramForm;

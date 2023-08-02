import React, { useState } from "react";

const RightSection = () => {
  const [activeRightTab, setActiveRightTab] = useState("Master List");

  const handleRightTabChange = (tab) => {
    setActiveRightTab(tab);
  };

  return (
    <div className="right-section">
      <div className="tab-buttons">
        <button
          onClick={() => handleRightTabChange("Master List")}
          className={activeRightTab === "Master List" ? "active" : ""}
        >
          Master List
        </button>
        <button
          onClick={() => handleRightTabChange("Option 1")}
          className={activeRightTab === "Option 1" ? "active" : ""}
        >
          Option 1
        </button>
        <button
          onClick={() => handleRightTabChange("Option 2")}
          className={activeRightTab === "Option 2" ? "active" : ""}
        >
          Option 2
        </button>
        <button
          onClick={() => handleRightTabChange("Option 3")}
          className={activeRightTab === "Option 3" ? "active" : ""}
        >
          Option 3
        </button>
      </div>
      <div className="right-section-content">
        {activeRightTab === "Master List" ? <MasterList /> : <div>Coming soon</div>}
      </div>
    </div>
  );
};

const MasterList = () => {
  // Implement logic to display songs in alphabetical order
  const songs = []; // Replace with your list of songs

  return (
    <div>
      <h2>Master List</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>
    </div>
  );
};

export default RightSection;

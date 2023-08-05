import React, { useState } from "react";
import OptionsList from './OptionsList';
import MasterList from './MasterList';

const RightSection = ({ songs, onDeleteSong, onClearList, setLength, onSetLength, onCreateSet }) => {
  const [activeRightTab, setActiveRightTab] = useState("Master List");
  const [generatedOptions, setGeneratedOptions] = useState([]);  

  const handleTabChange = (tab) => {
    setActiveRightTab(tab);
  };

  const handleGenerateOptions = () => {
    const randomCombinations = [];  

    // Generate three random combinations of three songs each
    for (let i = 0; i < 3; i++) {
      const option = [];
      while (option.length < 3) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        if (!option.includes(songs[randomIndex])) {
          option.push(songs[randomIndex]);
        }
      }
      randomCombinations.push(option);
    }

    setGeneratedOptions(randomCombinations);
    setActiveRightTab("Option 1"); // Display the first generated option
  };

  const handleClearList = () => {
    onClearList();
    setGeneratedOptions([]);
  };

  return (
    <div className="right-section">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeRightTab === "Master List" ? "active" : ""
                }`}
                onClick={() => handleTabChange("Master List")}
              >
                Master List
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeRightTab === "Option 1" ? "active" : ""
                }`}
                onClick={() => handleTabChange("Option 1")}
              >
                Option 1
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeRightTab === "Option 2" ? "active" : ""
                }`}
                onClick={() => handleTabChange("Option 2")}
              >
                Option 2
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeRightTab === "Option 3" ? "active" : ""
                }`}
                onClick={() => handleTabChange("Option 3")}
              >
                Option 3
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {activeRightTab === "Master List" ? (
            <div>              
              <MasterList songs={songs} onDeleteSong={onDeleteSong} onGenerateOptions={handleGenerateOptions} onSetLength={onSetLength}
              onCreateSet={onCreateSet} />
            </div>
          ) : (
            <div className="italicized-text">
              {activeRightTab === "Option 1" ? (
                <OptionsList options={generatedOptions[0]} />
              ) : activeRightTab === "Option 2" ? (
                <OptionsList options={generatedOptions[1]} />
              ) : (
                <OptionsList options={generatedOptions[2]} />
              )}
            </div>
          )}
          {songs.length > 0 && (
            <div className="mt-3">
              <button className="btn btn-danger" onClick={handleClearList}>
                Clear List
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default RightSection;

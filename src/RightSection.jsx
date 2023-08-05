import React, { useState } from "react";
import MasterList from './MasterList';
import GenerateSetList from './GenerateSetList';

const RightSection = ({ songs, onDeleteSong, onClearList, setLength, onSetLength, onCreateSet }) => {
  const [activeRightTab, setActiveRightTab] = useState("Master List");

  const handleTabChange = (tab) => {
    setActiveRightTab(tab);
  };

  const handleClearList = () => {
    onClearList();
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
                  activeRightTab === "Generate Set List" ? "active" : ""
                }`}
                onClick={() => handleTabChange("Generate Set List")}
              >
                Generate Set List
              </button>
            </li>            
          </ul>
        </div>
        <div className="card-body">
          {activeRightTab === "Master List" ? (
            <div>              
              <MasterList songs={songs} onDeleteSong={onDeleteSong} onSetLength={onSetLength}
              onCreateSet={onCreateSet} />
            </div>
          ) : (
            <div>
              <GenerateSetList songs={songs} />
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

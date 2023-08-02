import React, { useState } from "react";

const RightSection = ({ songs, onDeleteSong }) => {
  const [activeRightTab, setActiveRightTab] = useState("Master List");

  const handleTabChange = (tab) => {
    setActiveRightTab(tab);
  };

  return (
    <div className="right-section">
      <div className="card">
        <div className="card-header">
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
            <MasterList songs={songs} onDeleteSong={onDeleteSong} />
          ) : (
            <div className="italicized-text">
              {activeRightTab} Content (coming soon)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MasterList = ({ songs, onDeleteSong }) => {
  // Sort the songs in alphabetical order by their titles
  const sortedSongs = songs.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="master-list">
      <h2>Master List</h2>
      {sortedSongs.length === 0 ? (
        <p>Enter songs on the left.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Song Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedSongs.map((song, index) => (
              <tr key={index}>
                <td>{song.title}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDeleteSong(song.title)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RightSection;

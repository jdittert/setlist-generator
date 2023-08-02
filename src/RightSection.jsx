import React from "react";

const RightSection = ({ songs }) => {
  return (
    <div className="right-section">
      <div className="tab-buttons">
        {/* ... (the rest of the code remains the same) */}
      </div>
      <div className="right-section-content">
        <MasterList songs={songs} />
      </div>
    </div>
  );
};

const MasterList = ({ songs }) => {
  // Sort the songs in alphabetical order by their titles
  const sortedSongs = songs.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="master-list">
      <h2>Master List</h2>
      <ul>
        {sortedSongs.map((song, index) => (
          <li key={index}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RightSection;

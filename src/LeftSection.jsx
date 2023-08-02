import React from 'react';
import { useState } from "react";

const LeftSection = () => {
  const [activeTab, setActiveTab] = useState("addSong");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='left-section'>
      <div className='tab-buttons'>
        <button onClick={() => handleTabChange("addSong")}>Add Song</button>
        <button onClick={() => handleTabChange("importPlaylist")}>
          Import Playlist
        </button>
      </div>
      {activeTab === "addSong" ? (
        <div>
          <h2>Song Input</h2>
          <form className='song-form'>
            <label>Title:</label>
            <input type="text" name="title" />
            <label>Artist:</label>
            <input type="text" name="artist" />
            <label>Time:</label>
            <input type="text" name="time" />
            <label>BPM:</label>
            <input type="number" name="bpm" />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>import playlist</div>
      )}
    </div>
  );
};

export default LeftSection;

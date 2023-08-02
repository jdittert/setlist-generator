import React, { useState } from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const HomePage = () => {
  const [songList, setSongList] = useState([]);

  const handleAddSong = (newSong) => {
    setSongList((prevSongList) => [...prevSongList, newSong]);
  };

  return (
    <div>
      <h1>Set List Generator</h1>
      <div style={{ display: "flex" }}>
        <LeftSection onAddSong={handleAddSong} />
        <RightSection songs={songList} />
      </div>
    </div>
  );
};

export default HomePage;

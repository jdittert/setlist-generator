import React, { useState, useEffect } from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const HomePage = () => {
  const [songList, setSongList] = useState(localStorage.getItem("songList") != null ? JSON.parse(localStorage.getItem("songList")) : [] );

  useEffect(() => {
    // Load songList from localStorage
    const storedSongList = localStorage.getItem("songList");
    if (storedSongList) {
      setSongList(JSON.parse(storedSongList));
    }
  }, []);

  useEffect(() => {
    // Save songList to localStorage whenever it changes
    localStorage.setItem("songList", JSON.stringify(songList));
  }, [songList]);

  const handleAddSong = (newSong) => {
    setSongList((prevSongList) => [...prevSongList, newSong]);
  };

  const handleDeleteSong = (title) => {
    setSongList((prevSongList) => prevSongList.filter((song) => song.title !== title));
  };

  return (
    <div>
      <h1>Set List Generator</h1>
      <div style={{ display: "flex" }}>
        <LeftSection onAddSong={handleAddSong}  />
        <RightSection songs={songList} onDeleteSong={handleDeleteSong} />
      </div>
    </div>
  );
};

export default HomePage;

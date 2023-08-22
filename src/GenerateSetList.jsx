import React, { useState, useEffect } from "react";
import SetList from './SetList';

const GenerateSetList = ({ songs }) => {
  const [numSongs, setNumSongs] = useState("");
  const [numMinutes, setNumMinutes] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [generatedSet, setGeneratedSet] = useState([]);
  const [previousGeneratedSet, setPreviousGeneratedSet] = useState([]);
  const [storedGeneratedSet, setStoredGeneratedSet] = useState(null);

  useEffect(() => {
    // Load stored generated set list from local storage
    const storedSetList = localStorage.getItem("storedGeneratedSet");
    if (storedSetList) {
      setStoredGeneratedSet(JSON.parse(storedSetList));
      setGeneratedSet(JSON.parse(storedSetList)); // Populate generatedSet from storedGeneratedSet
    }
  }, []);

  // Load the last user inputs from local storage
  useEffect(() => {
    const storedNumSongs = localStorage.getItem("storedNumSongs");
    const storedNumMinutes = localStorage.getItem("storedNumMinutes");
    if (storedNumSongs) {
      setNumSongs(storedNumSongs);
    }
    if (storedNumMinutes) {
      setNumMinutes(storedNumMinutes);
    }
  }, []);

  const handleGenerate = (numSongs, numMinutes, retryCount = 0) => {
    let newGeneratedSet;

    // Check if the user has added either numSongs or numMinutes, but not both
    if ((numSongs && numMinutes) || (!numSongs && !numMinutes)) {
      setAlertMessage("Please choose either Number of Songs or Number of Minutes.");
      setGeneratedSet([]); // Clear any previously generated set
      return [];
    }

    if (numSongs && Number(numSongs) > songs.length) {
      setAlertMessage("Number of Songs cannot exceed the total number of songs.");
      newGeneratedSet = shuffleArray(songs); // Return full list in random order
    } else if (numMinutes && Number(numMinutes) > getTotalTime() / 60) {
      setAlertMessage("Number of Minutes cannot exceed the total length of songs.");
      newGeneratedSet = shuffleArray(songs); // Return full list in random order
    } else if (numSongs) {
      newGeneratedSet = getRandomSongs(numSongs);
    } else if (numMinutes) {
      const totalSeconds = numMinutes * 60;
      newGeneratedSet = getRandomSongsWithinTime(totalSeconds);
    }

    if (
      newGeneratedSet.length === previousGeneratedSet.length &&
      newGeneratedSet.every((song, index) => song.title === previousGeneratedSet[index].title)
    ) {
      if (retryCount < 3) {
        // Retry generating a new list using the same criteria
        return handleGenerate(numSongs, numMinutes, retryCount + 1);
      } else {
        // Inform the user that this is the only possible list
        setAlertMessage("This is the only possible set list.");
        return newGeneratedSet;
      }
    }

    localStorage.setItem("storedGeneratedSet", JSON.stringify(newGeneratedSet));
    localStorage.setItem("storedNumSongs", numSongs);
    localStorage.setItem("storedNumMinutes", numMinutes);  
    setGeneratedSet(newGeneratedSet); // Set the newly generated set
    setPreviousGeneratedSet(newGeneratedSet); // Update previousGeneratedSet
    return newGeneratedSet;
  };

  const handleReGenerate = () => {
    setGeneratedSet(handleGenerate(numSongs, numMinutes));
  };

  const getRandomSongs = (count) => {
    const shuffledSongs = songs.sort(() => Math.random() - 0.5);
    return shuffledSongs.slice(0, count);
  };

  const getTotalTime = () => {
    return songs.reduce((total, song) => total + (song.totalSeconds || 300), 0);
  };

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const getRandomSongsWithinTime = (targetTime) => {
    const shuffledSongs = songs.sort(() => Math.random() - 0.5);
    const selectedSongs = [];
    let currentTime = 0;
    for (const song of shuffledSongs) {
      if (song.timeInSeconds && currentTime + song.timeInSeconds <= targetTime) {
        selectedSongs.push(song);
        currentTime += song.timeInSeconds;
      }
    }
    return selectedSongs;
  };

  const handleReset = () => {
    setNumSongs("");
    setNumMinutes("");
    setAlertMessage("");
    setGeneratedSet([]);
    setStoredGeneratedSet(null); // Clear stored generated set list
    localStorage.removeItem("storedGeneratedSet"); // Clear stored generated set list in local storage
    localStorage.removeItem("storedNumSongs"); // Clear stored numSongs in local storage
    localStorage.removeItem("storedNumMinutes"); // Clear stored numMinutes in local storage
  };

  return (
    <div className="generate-set-list">
      {songs.length === 0 ? (
        <p className="alert alert-info mt-2">Add songs or import a playlist to generate a set list.</p>
      ) : (
        <>   
      {alertMessage && <div className="alert alert-danger mt-2">{alertMessage}</div>}
      {generatedSet.length === 0 ? (
       <>
       <h2>Generate Set List</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleGenerate(numSongs, numMinutes); }}>
        <div className="form-group">
          <label htmlFor="numSongs">Number of Songs:</label>
          <input
            type="number"
            id="numSongs"
            className="form-control"
            value={numSongs}
            onChange={(e) => {
              setNumSongs(e.target.value);
              setAlertMessage("");
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="numMinutes">Number of Minutes:</label>
          <input
            type="number"
            id="numMinutes"
            className="form-control"
            value={numMinutes}
            onChange={(e) => {
              setNumMinutes(e.target.value);
              setAlertMessage("");
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary me-3" disabled={!numSongs && !numMinutes}>
          Generate
        </button>
        <button type="button" className="btn btn-secondary ml-2" onClick={handleReset}>
            Reset
          </button>        
      </form>  
      </>    
      ) : (
        <SetList songs={generatedSet} numSongs={numSongs} numMinutes={numMinutes} onReGenerate={handleReGenerate} onReset={handleReset} />
      )}
      </>
      )}
      
    </div>
    
  );
};

export default GenerateSetList;

import React, { useState } from "react";
import SetList from './SetList';

const GenerateSetList = ({ songs }) => {
  const [numSongs, setNumSongs] = useState("");
  const [numMinutes, setNumMinutes] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [generatedSet, setGeneratedSet] = useState([]);

  const handleGenerate = (e) => {
    e.preventDefault();

    if ((numSongs && numMinutes) || (!numSongs && !numMinutes)) {
      setAlertMessage("Please choose either the number of songs or the number of minutes.");
    } else if (numSongs) {
        const num = parseInt(numSongs, 10);
        if (num > songs.length) {
          setGeneratedSet(songs.sort(() => Math.random() - 0.5));
          setAlertMessage(`Value exceeds total number of songs. Showing entire list in random order.`);
        } else {
          setGeneratedSet(getRandomSongs(num));
        }
    } else if (numMinutes) {
      console.log(`${numMinutes} minutes`);
    }
  };

  const getRandomSongs = (count) => {
    const shuffledSongs = songs.sort(() => Math.random() - 0.5);
    return shuffledSongs.slice(0, count);
  };

  const handleReGenerate = () => {
    setAlertMessage("");
    if (numSongs) {
      setGeneratedSet(getRandomSongs(parseInt(numSongs, 10)));
    }
  };

  const handleReset = () => {
    setNumSongs("");
    setNumMinutes("");
    setAlertMessage("");
    setGeneratedSet([]);
  };

  return (
    <div className="generate-set-list">      
      {alertMessage && <div className="alert alert-danger mt-2">{alertMessage}</div>}
      {generatedSet.length === 0 ? (
       <>
       <h2>Generate Set List</h2>
      <form onSubmit={handleGenerate}>
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
        <SetList songs={generatedSet} numSongs={numSongs} onReGenerate={handleReGenerate} onReset={handleReset} />
      )}
      
    </div>
    
  );
};

export default GenerateSetList;
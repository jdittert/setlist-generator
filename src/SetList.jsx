const SetList = ({ songs, numSongs, numMinutes, onReGenerate, onReset }) => {

    const formatTime = (totalSeconds) => {
        if (totalSeconds === "") {
          return <span style={{ color: "red" }}>5:00</span>;
        }
    
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      };
    
      const calculateTotalTime = () => {
        const totalSeconds = songs.reduce((total, song) => total + (song.timeInSeconds || 300), 0);
        return formatTime(totalSeconds);
      };

    return (
      <div className="set-list">
        <h2>Set List ({numMinutes ? `${numMinutes} Minutes` : `${numSongs} Songs`})</h2>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Song Title</th>
            <th className='text-end'>Length</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={index}>
              <td>{song.title}</td>
              <td className="text-end">{formatTime(song.timeInSeconds)}</td>
            </tr>
          ))}
          <tr>
            <td className="fw-bold">Total Time</td>
            <td className="fw-bold text-end">{calculateTotalTime()}</td>
          </tr>
        </tbody>
      </table>
        <button className="btn btn-primary" onClick={onReGenerate}>
          Re-Generate
        </button>
        <button className="btn btn-secondary ms-2" onClick={onReset}>
        Reset
      </button>
      </div>
    );
  };
  
  export default SetList;
  
  
  
  
  
  
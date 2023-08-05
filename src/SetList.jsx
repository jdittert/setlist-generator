const SetList = ({ songs, numSongs, onReGenerate, onReset }) => {
    return (
      <div className="set-list">
        <h2>Set List ({numSongs} Songs)</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Song Title</th>
              {/* ... (Other table headers) */}
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr key={index}>
                <td>{song.title}</td>
                {/* ... (Other table data) */}
              </tr>
            ))}
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
  
  
  
  
  
  

const MasterList = ({ songs, onDeleteSong, setLength, onSetLength, onClearList }) => {
    // Sort the songs in alphabetical order by their titles
    const sortedSongs = songs.sort((a, b) => a.title.localeCompare(b.title));
  
    return (
      <div className="master-list">
        <div className="d-flex justify-content-between">
          <h2>Master List</h2>
        </div>
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
        {songs.length > 0 && (
            <div className="mt-3">
              <button className="btn btn-danger" onClick={onClearList}>
                Clear List
              </button>
            </div>
          )}
      </div>
    );
  };

export default MasterList
import { useRef } from 'react';

const MasterList = ({ songs, onDeleteSong, setLength, onSetLength, onCreateSet }) => {
    // Sort the songs in alphabetical order by their titles
    const sortedSongs = songs.sort((a, b) => a.title.localeCompare(b.title));
    const setLengthRef = useRef();
  
    const handleCreateSet = (event) => {
      event.preventDefault();
      // Add your logic to create a set based on the selected songs
      console.log(setLengthRef.current.value);
      onCreateSet();
    };
  
    return (
      <div className="master-list">
        <div className="d-flex justify-content-between">
          <h2>Master List</h2>
        </div>
        {/* Create Set input and button */}
        <div className="mt-3 d-flex justify-content-between">
              <input
                type="number"
                className="form-control"
                placeholder="Minutes"
                value={setLength}
                ref={setLengthRef}
              />
              <button className="btn btn-success" onClick={handleCreateSet}>
                Create Set
              </button>
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
      </div>
    );
  };

export default MasterList
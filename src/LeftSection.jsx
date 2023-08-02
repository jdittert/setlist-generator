import React, { useState } from "react";

const LeftSection = ({ onAddSong }) => {
  const [activeTab, setActiveTab] = useState("newSong");
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    minutes: "",
    seconds: "",
    bpm: "",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, artist, minutes, seconds, bpm } = formData;
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      alert("Title is required.");
      return;
    }

    const totalSeconds =
      (minutes ? parseInt(minutes, 10) : 0) * 60 +
      (seconds ? parseInt(seconds, 10) : 0);

    if (minutes && (isNaN(totalSeconds) || totalSeconds < 0 || totalSeconds >= 3600)) {
      alert(
        "Invalid time. Minutes should be a positive number, and seconds should be between 00 and 59."
      );
      return;
    }

    if (bpm && (isNaN(bpm) || bpm <= 0 || bpm >= 350)) {
      alert("Invalid BPM. BPM should be a positive integer less than 350.");
      return;
    }

    const newSong = {
      title: trimmedTitle,
      artist: artist.trim(),
      timeInSeconds: totalSeconds,
      bpm: bpm ? parseInt(bpm, 10) : undefined,
    };

    onAddSong(newSong);

    setFormData({
      title: "",
      artist: "",
      minutes: "",
      seconds: "",
      bpm: "",
    });
  };

  return (
    <div className="left-section">
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "newSong" ? "active" : ""}`}
                onClick={() => handleTabChange("newSong")}
              >
                New Song
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "importPlaylist" ? "active" : ""}`}
                onClick={() => handleTabChange("importPlaylist")}
              >
                Import Playlist
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
        {activeTab === "newSong" ? (
            <div className="song-form">
              <h2>Song Input</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="artist">Artist</label>
                  <input
                    type="text"
                    id="artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <div className='col-6'>
                    <div className="form-group">
                      <label>Time</label>
                      <div className="d-flex gap-1">
                        <input
                          type="text"
                          id="minutes"
                          name="minutes"
                          value={formData.minutes}
                          onChange={handleChange}
                          placeholder="MM"
                          maxLength="3"
                          className="small-input"
                        />
                        <span className="time-separator">:</span>
                        <input
                          type="text"
                          id="seconds"
                          name="seconds"
                          value={formData.seconds}
                          onChange={handleChange}
                          placeholder="SS"
                          maxLength="2"
                          className="small-input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="bpm">BPM</label>
                      <input
                        type="text"
                        id="bpm"
                        name="bpm"
                        value={formData.bpm}
                        onChange={handleChange}
                        maxLength="3"
                        className="small-input"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <div>Import Coming Soon</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSection;

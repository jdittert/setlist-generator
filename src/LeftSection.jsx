import React, { useState } from "react";

const LeftSection = ({ onAddSong }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    minutes: "",
    seconds: "",
    bpm: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate the form data here and convert minutes and seconds to total seconds
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

    // Clear the form fields after submission
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
      <div className="tab-buttons">
        {/* ... (the rest of the code remains the same) */}
      </div>
      <div className="song-form">
        <h2>Song Input</h2>
        <form onSubmit={handleSubmit}>
          <label>Title: *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label>Artist:</label>
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
          />
          <label>Time:</label>
          <div className="time-inputs">
            <input
              type="text"
              name="minutes"
              placeholder="MM"
              value={formData.minutes}
              onChange={handleChange}
              pattern="\d*"
            />
            <span>:</span>
            <input
              type="text"
              name="seconds"
              placeholder="SS"
              value={formData.seconds}
              onChange={handleChange}
              pattern="[0-5]?[0-9]"
            />
          </div>
          <label>BPM:</label>
          <input
            type="text"
            name="bpm"
            value={formData.bpm}
            onChange={handleChange}
            pattern="\d*"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LeftSection;

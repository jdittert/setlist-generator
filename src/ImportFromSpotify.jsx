import React, { useState } from "react";

const ImportFromSpotify = ({ onImportPlaylist }) => {
  const [spotifyPlaylistUrl, setSpotifyPlaylistUrl] = useState("");
  const [importError, setImportError] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  // Insert your Spotify API client ID and client secret
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  const handleImportChange = (event) => {
    setSpotifyPlaylistUrl(event.target.value);
    setImportError(""); // Clear previous error
  };

  const handleImportSubmit = async (event) => {
    event.preventDefault();

    setIsImporting(true);
    setImportError(""); // Clear previous error

    // Validate Spotify playlist URL
    if (!isValidSpotifyPlaylistUrl(spotifyPlaylistUrl)) {
      setImportError("Invalid Spotify playlist URL");
      setIsImporting(false);
      return;
    }

    try {
      const playlistId = extractPlaylistId(spotifyPlaylistUrl);
      const playlistResponse = await fetchPlaylist(playlistId);

      if (!playlistResponse || !playlistResponse.tracks || playlistResponse.tracks.items.length === 0) {
        setImportError("Invalid or Empty Playlist");
        setIsImporting(false);
        return;
      }

      const songs = playlistResponse.tracks.items.map((item) => ({
        title: item.track.name,
        artist: item.track.artists.map((artist) => artist.name).join(", "),
        timeInSeconds: item.track.duration_ms ? Math.floor(item.track.duration_ms / 1000) : 0,
        bpm: "0", // BPM from Spotify API might require additional processing
      }));

      onImportPlaylist(songs);
      setIsImporting(false);
      setSpotifyPlaylistUrl("");
    } catch (error) {
      setImportError("Error importing playlist");
      setIsImporting(false);
    }
  };

  const extractPlaylistId = (url) => {
    // Example URL formats:
    // - https://open.spotify.com/playlist/playlist_id
    // - spotify:playlist:playlist_id
  
    let playlistId = "";
  
    // Match the URL format: https://open.spotify.com/playlist/playlist_id
    const openUrlMatch = url.match(/\/playlist\/([^/?]+)/);
    if (openUrlMatch) {
      playlistId = openUrlMatch[1];
    }
  
    // If not found, match the URL format: spotify:playlist:playlist_id
    if (!playlistId) {
      const uriMatch = url.match(/spotify:playlist:([^/?]+)/);
      if (uriMatch) {
        playlistId = uriMatch[1];
      }
    }
  
    return playlistId;
  };

  const fetchPlaylist = async (playlistId) => {
    try {
      

  
      // Encode client ID and client secret as base64
      const credentials = btoa(`${clientId}:${clientSecret}`);
  
      // Fetch access token from the Spotify API (this part may vary based on your authentication flow)
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
        body: "grant_type=client_credentials",
      });
  
      const data = await response.json();
      const accessToken = data.access_token;
  
      // Fetch playlist details using the access token
      const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const playlistData = await playlistResponse.json();
      return playlistData;
    } catch (error) {
      console.error("Error fetching playlist:", error);
      throw error;
    }
  };
  

  const isValidSpotifyPlaylistUrl = (url) => {
    // Add your validation logic here to check if the URL is a valid Spotify playlist URL
    // You can use regex or other methods to perform this validation
    // For simplicity, let's assume the URL is valid if it's not empty
    return url.trim() !== "";
  };

  return (
    <form onSubmit={handleImportSubmit}>
      <div className="form-group">
        <label>Import from Spotify</label>
        <input
          type="text"
          id="spotifyPlaylistUrl"
          name="spotifyPlaylistUrl"
          placeholder="Enter link to Spotify playlist..."
          value={spotifyPlaylistUrl}
          onChange={handleImportChange}
          className={`form-control ${importError ? "is-invalid" : ""}`}
        />
        {importError && <div className="invalid-feedback">{importError}</div>}
      </div>
      <button type="submit" className="btn btn-primary mt-2" disabled={isImporting}>
        {isImporting ? "Importing..." : "Import"}
      </button>
    </form>
  );
};

export default ImportFromSpotify;

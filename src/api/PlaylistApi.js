import axios from "axios";

const API_URL = import.meta.env.VITE_URL + "/playlists";

// Hent alle brugerens playlister
export const getUserPlaylists = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch playlists:", error);
    throw error;
  }
};

// Opret en ny playliste
export const createPlaylist = async (playlistData, token) => {
  try {
    const response = await axios.post(API_URL, playlistData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create playlist:", error);
    throw error;
  }
};

// Opdater en eksisterende playliste via ID
export const updatePlaylist = async (playlistId, updatedData, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/${playlistId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update playlist:", error);
    throw error;
  }
};

// Slet en playliste via ID
export const deletePlaylist = async (playlistId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete playlist:", error);
    throw error;
  }
};

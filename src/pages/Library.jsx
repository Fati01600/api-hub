import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const LibraryWrapper = styled.div`
  position: relative;
  text-align: center;
  color: white;
  min-height: 100vh;
  padding: 20px;
  background-color: #121212;
`;

const PlaylistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const PlaylistCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  padding: 15px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover {
    background: rgba(255, 69, 0, 0.3);
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
`;

const PlaylistDetails = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #ccc;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
`;

const ViewButton = styled(Button)`
  background-color: #28a745;
  color: white;
  &:hover {
    background-color: #3de459;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ff4500; 
    color: white;
  &:hover {
    background-color: #e03d00;
  }
`;

const SongListWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  text-align: left;
  color: white;

  h2 {
    margin-bottom: 15px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;

    th, td {
      padding: 10px;
      border: 1px solid #444;
      text-align: left;
    }

    th {
      background-color: #252525;
      color: white;
      font-size: 1rem;
    }

    td {
      background-color: rgba(255, 255, 255, 0.1);
      font-size: 0.9rem;
    }
  }

  .close-button {
    background-color: #ff4500;
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
      background-color: #e03d00;
    }
  }
`;

function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/playlists`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const viewSongs = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const closeSongsView = () => {
    setSelectedPlaylist(null);
  };

  return (
    <LibraryWrapper>
      <h1>Your Saved Playlists</h1>
      {playlists.length > 0 ? (
        <>
          <PlaylistsContainer>
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id}>
                <h2>{playlist.name}</h2>
                <PlaylistDetails>
                  <p>Genre: {playlist.genre}</p>
                  <p>Mood: {playlist.mood}</p>
                </PlaylistDetails>
                <ViewButton onClick={() => viewSongs(playlist)}>View Songs</ViewButton>
                <DeleteButton>Delete Playlist</DeleteButton>
              </PlaylistCard>
            ))}
          </PlaylistsContainer>

          {selectedPlaylist && (
            <SongListWrapper>
              <h2>{selectedPlaylist.name} - Songs</h2>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Genre</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPlaylist.songs.map((song, index) => (
                    <tr key={index}>
                      <td>{song.title}</td>
                      <td>{song.artist}</td>
                      <td>{song.genre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="close-button" onClick={closeSongsView}>
                Close
              </button>
            </SongListWrapper>
          )}
        </>
      ) : (
        <p>No playlists available. Start adding your favorites!</p>
      )}
    </LibraryWrapper>
  );
}

export default Library;

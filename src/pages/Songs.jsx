import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";


const SongsWrapper = styled.div`
  padding: 20px;
  color: white;
  background-color: #121212;
  min-height: 100vh;
`;


const SongsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 10px;
    border: 1px solid #444;
    text-align: left;
  }

  th {
    background-color: #252525;
    color: white;
  }

  td {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;


const Button = styled.button`
  padding: 5px 10px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
`;

const EditButton = styled(Button)`
  background-color: #28a745;
  color: white;
  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  &:hover {
    background-color: #c82333;
  }
`;

const SaveButton = styled(Button)`
  background-color: #28a745;
  color: white;
  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  &:hover {
    background-color: #c82333;
  }
`;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1f1f1f;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  width: 350px;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  color: #ff4500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #555;
  border-radius: 5px;
  background-color: #2c2c2c;
  color: white;

  &:focus {
    outline: none;
    border-color: #ff4500;
  }
`;


function Songs() {
  const [songs, setSongs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSong, setCurrentSong] = useState({ id: null, title: "", artist: "", genre: "" });

 
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/songs`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
        });
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/songs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
      });
      setSongs(songs.filter((song) => song.id !== id));
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleEdit = (song) => {
    setCurrentSong(song);
    setIsEditing(true);
  };

 
  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_URL}/songs/${currentSong.id}`, currentSong, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
      });

      setSongs(
        songs.map((song) =>
          song.id === currentSong.id ? currentSong : song
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSong({ ...currentSong, [name]: value });
  };

  return (
    <SongsWrapper>
      <h1>All Songs</h1>
      <SongsTable>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
              <td>
                <EditButton onClick={() => handleEdit(song)}>Edit</EditButton>
                <DeleteButton onClick={() => handleDelete(song.id)}>Delete</DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </SongsTable>

      {isEditing && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Edit Song</ModalTitle>
            <Input
              type="text"
              name="title"
              value={currentSong.title}
              onChange={handleInputChange}
              placeholder="Title"
            />
            <Input
              type="text"
              name="artist"
              value={currentSong.artist}
              onChange={handleInputChange}
              placeholder="Artist"
            />
            <Input
              type="text"
              name="genre"
              value={currentSong.genre}
              onChange={handleInputChange}
              placeholder="Genre"
            />
            <div>
              <SaveButton onClick={handleSave}>Save</SaveButton>
              <CancelButton onClick={() => setIsEditing(false)}>Cancel</CancelButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </SongsWrapper>
  );
}

export default Songs;

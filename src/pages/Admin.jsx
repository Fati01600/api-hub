import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";


const AdminWrapper = styled.div`
  padding: 20px;
  padding-top: 80px;
  background: #121212;
  color: white;
  min-height: 100vh;
`;

const Header = styled.div`
  background: #252525;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AdminTitle = styled.h1`
  color: #ffffff;
  font-size: 1.8rem;
`;

const Section = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const SectionTitle = styled.h2`
  margin-bottom: 15px;
  color: #ff6f00;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  flex: 1;
  margin: 0 10px;

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: white;
  }

  p {
    margin: 5px 0 0;
    font-size: 0.8rem;
    color: #ccc;
  }
`;

const TableWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(34, 34, 34, 0.8);
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #383838;
  background-color: #383838;
  color: white;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #333;
  color: white;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #ff4500;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #e03d00;
  }
`;


function Admin() {
  const [users, setUsers] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, playlistsResponse, songsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_URL}/users`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
          }),
          axios.get(`${import.meta.env.VITE_URL}/playlists`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
          }),
          axios.get(`${import.meta.env.VITE_URL}/songs`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
          }),
        ]);

        setUsers(usersResponse.data);
        setPlaylists(playlistsResponse.data);
        setSongs(songsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (endpoint, id, setState) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
      });
      setState((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(`Error deleting ${endpoint}:`, error);
    }
  };

  return (
    <AdminWrapper>
      <Header>
        <AdminTitle>Hello Admin, Ready to Manage?</AdminTitle>
      </Header>

      {/* Dashboard */}
      <Section>
        <SectionTitle>Dashboard</SectionTitle>
        <Stats>
          <StatCard>
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </StatCard>
          <StatCard>
            <h3>{playlists.length}</h3>
            <p>Total Playlists</p>
          </StatCard>
          <StatCard>
            <h3>{songs.length}</h3>
            <p>Total Songs</p>
          </StatCard>
        </Stats>
      </Section>

      {/* Users Section */}
      <Section>
        <SectionTitle>Users</SectionTitle>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Username</Th>
                <Th>Role</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <Td>{user.username}</Td>
                  <Td>{user.roles.join(", ")}</Td>
                  <Td>
                    <Button>Edit</Button>
                    <Button onClick={() => handleDelete("users", user.id, setUsers)}>Delete</Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </Section>

      {/* Playlists Section */}
      <Section>
        <SectionTitle>Playlists</SectionTitle>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Genre</Th>
                <Th>Mood</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {playlists.map((playlist) => (
                <tr key={playlist.id}>
                  <Td>{playlist.name}</Td>
                  <Td>{playlist.genre}</Td>
                  <Td>{playlist.mood}</Td>
                  <Td>
                    <Button>Edit</Button>
                    <Button onClick={() => handleDelete("playlists", playlist.id, setPlaylists)}>Delete</Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </Section>

      {/* Songs Section */}
      <Section>
        <SectionTitle>Songs</SectionTitle>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Title</Th>
                <Th>Artist</Th>
                <Th>Genre</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
                  <Td>{song.title}</Td>
                  <Td>{song.artist}</Td>
                  <Td>{song.genre}</Td>
                  <Td>
                    <Button>Edit</Button>
                    <Button onClick={() => handleDelete("songs", song.id, setSongs)}>Delete</Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </Section>
    </AdminWrapper>
  );
}

export default Admin;

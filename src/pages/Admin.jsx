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

function Admin() {
  const [users, setUsers] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:7777/api/v1/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
        });
        setUsers(usersResponse.data);

        const playlistsResponse = await axios.get("http://localhost:7777/api/v1/playlists", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
        });
        setPlaylists(playlistsResponse.data);

        const songsResponse = await axios.get("http://localhost:7777/api/v1/songs", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
        });
        setSongs(songsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminWrapper>
      <Header>
        <AdminTitle>Hello Admin, Ready to Manage?</AdminTitle>
      </Header>

      {/* Dashboard Stats */}
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
              {users.map((user, index) => (
                <tr key={index}>
                  <Td>{user.username}</Td>
                  <Td>{user.roles.join(", ")}</Td>
                  <Td>
                    <button>Edit</button> <button>Delete</button>
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
              {playlists.map((playlist, index) => (
                <tr key={index}>
                  <Td>{playlist.name}</Td>
                  <Td>{playlist.genre}</Td>
                  <Td>{playlist.mood}</Td>
                  <Td>
                    <button>Edit</button> <button>Delete</button>
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
              {songs.map((song, index) => (
                <tr key={index}>
                  <Td>{song.title}</Td>
                  <Td>{song.artist}</Td>
                  <Td>{song.genre}</Td>
                  <Td>
                    <button>Edit</button> <button>Delete</button>
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

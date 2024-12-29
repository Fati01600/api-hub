import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logoImage.jpg";
import { searchSpotify } from "../api/SpotifyApi";
import { useUser } from "../api/UserContext";

const Header = styled.header`
  margin: 0;
  padding: 10px 20px;
  background-color: #ff0000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 20px #ff4500;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: 0 0 10px #ff4500, 0 0 20px #ff6347;
`;

const LogoText = styled.div`
  font-size: 1.8rem;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 10px #ff4500, 0 0 20px #ff6347;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  padding: 5px 10px 5px 30px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  box-shadow: 0 0 10px #ff4500;
  width: 250px;
`;

const ResultsDropdown = styled.div`
  position: absolute;
  top: 40px;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 10;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
`;

const ResultItem = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;

  &:hover {
    background: #f0f0f0;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
`;

const LogoutButton = styled.button`
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #ff4500;
    color: black;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  background-color: black;
  font-size: 1rem;
  padding: 5px 15px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #444;
    color: #ff6347;
  }

  &.active {
    font-weight: bold;
    background-color: #333;
    color: white;
  }
`;

function TopMenu({ onSongSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { user, logout } = useUser();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await searchSpotify(query);
      const formattedResults = response.map((track) => ({
        title: track.name,
        artist: track.artists[0]?.name || "Unknown Artist",
        url: track.preview_url,
      }));
      setResults(formattedResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Header>
      <LogoWrapper>
        <LogoImage src={logo} alt="MuzzPlayer Logo" />
        <LogoText>MuzzPlayer</LogoText>
      </LogoWrapper>

      <SearchWrapper>
        <FaSearch style={{ position: "absolute", left: 10, top: 8, color: "gray" }} />
        <SearchInput
          type="text"
          placeholder="Search for a song..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {results.length > 0 && (
          <ResultsDropdown>
            {results.map((song, index) => (
              <ResultItem
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onSongSelect(song);
                }}
              >
                <div>
                  <strong>{song.title}</strong>
                  <br />
                  <small>{song.artist}</small>
                </div>
              </ResultItem>
            ))}
          </ResultsDropdown>
        )}
      </SearchWrapper>

      <UserWrapper>
        {user ? (
          <>
            <span>
              <strong>{user.username}</strong>
            </span>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </>
        ) : (
          <StyledLink to="/login">Login</StyledLink>
        )}
      </UserWrapper>
    </Header>
  );
}

TopMenu.propTypes = {
  onSongSelect: PropTypes.func.isRequired,
};

export default TopMenu;

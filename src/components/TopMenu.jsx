import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
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
  padding: 10px 15px 10px 35px;
  border-radius: 25px;
  border: 2px solid #ddd;
  font-size: 1rem;
  box-shadow: 0 0 10px rgba(255, 69, 0, 0.2);
  width: 250px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff4500;
    box-shadow: 0 0 15px rgba(255, 69, 0, 0.6);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  ${SearchInput}:focus + & {
    color: #ff4500;
  }
`;

const ResultsDropdown = styled.div`
  position: absolute;
  top: 50px;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) => (props.visible ? "translateY(0)" : "translateY(-10px)")};
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const ResultItem = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => (props.isSelected ? "#ff4500" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 69, 0, 0.1);
    transform: scale(1.02);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  background-color: black;
  font-size: 1rem;
  padding: 5px 15px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #444;
    color: #ff6347;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: all 0.3s ease-in-out;
  }

  &:hover:after {
    left: 100%;
  }

  &.active {
    font-weight: bold;
    background-color: #333;
    color: white;
  }
`;

const LogoutButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  font-size: 1rem;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #444;
    color: #ff6347;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: all 0.3s ease-in-out;
  }

  &:hover:after {
    left: 100%;
  }
`;

function TopMenu({ onSongSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { user, logout } = useUser();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === "") {
      setResults([]);
      setIsDropdownVisible(false);
      return;
    }

    try {
      const response = await searchSpotify(query);
      const formattedResults = response.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0]?.name || "Unknown Artist",
        url: track.preview_url,
      }));
      setResults(formattedResults);
      setIsDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setSearchTerm(song.title);
    setIsDropdownVisible(false); 
    onSongSelect(song);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <Header>
      <LogoWrapper onClick={() => (window.location.href = "/")}>
        <LogoImage src={logo} alt="MuzzPlayer Logo" />
        <LogoText>MuzzPlayer</LogoText>
      </LogoWrapper>

      <SearchWrapper>
  <SearchInput
    type="text"
    placeholder="Search for a song..."
    value={searchTerm}
    onChange={handleSearch}
  />
  <SearchIcon />
  {results.length > 0 && (
    <ResultsDropdown visible={isDropdownVisible}>
      {results.map((song, index) => (
        <ResultItem
          key={index}
          isSelected={selectedSong?.id === song.id}
          onClick={() => handleSongClick(song)}
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
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
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

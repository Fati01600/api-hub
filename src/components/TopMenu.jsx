import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logoImage.jpg";
import { useNavigate, NavLink } from "react-router-dom";
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

function TopMenu() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null); 
    navigate("/login"); 
  };

  return (
    <Header>
      {/* Logo that navigates to Home */}
      <LogoWrapper onClick={() => navigate("/")}>
        <LogoImage src={logo} alt="MuzzPlayer Logo" />
        <LogoText>MuzzPlayer</LogoText>
      </LogoWrapper>

      {/* Search Input */}
      <SearchWrapper>
        <FaSearch style={{ position: "absolute", left: 10, top: 8, color: "gray" }} />
        <SearchInput type="text" placeholder="Search for a song..." />
      </SearchWrapper>

      {/* User Section */}
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

export default TopMenu;

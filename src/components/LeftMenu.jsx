import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaHome, FaMusic, FaHeart, FaBroadcastTower, FaUsers, FaEye, FaCode } from 'react-icons/fa';

const Sidebar = styled.div`
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(34, 34, 34, 0.9);
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 80px 20px 20px; /* Top-padding inkluderet */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  color: #FFFFFF;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: rgba(255, 69, 0, 0.5);
    transform: translateX(5px);
  }

  &.active {
    background: rgba(255, 69, 0, 0.8);
  }
`;

const MenuIcon = styled.div`
  font-size: 1.5rem;
`;

const menuItems = [
  { to: '/', label: 'Home', icon: <FaHome /> },
  { to: '/library', label: 'Library', icon: <FaMusic /> },
  { to: '/discover', label: 'Discover', icon: <FaBroadcastTower /> },
  { to: '/favorites', label: 'Favorites', icon: <FaHeart /> },
  { to: '/artists', label: 'Artists', icon: <FaUsers /> },
  { to: '/vision', label: 'Vision', icon: <FaEye /> },
  { to: '/endpoints', label: 'Endpoints', icon: <FaCode /> },
];

function LeftMenu() {
  return (
    <Sidebar>
      {menuItems.map(({ to, label, icon }) => (
        <MenuItem key={to} to={to}>
          <MenuIcon>{icon}</MenuIcon>
          {label}
        </MenuItem>
      ))}
    </Sidebar>
  );
}

export default LeftMenu;

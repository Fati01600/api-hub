import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Header = styled.header`
  margin: 0;
  padding: 0;
  background-color: #FF0000;  /* rød*/
`;

const StyledMenu = styled.ul`
  background-color: #FF0000;  /* Srød */
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;


const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #000; /* Sort */

  &:hover {
    background-color: #333; /* Lysere sort ved hover */
    color: #FF0000; /* rød */
  }

  &.active {
    background-color: #444; /* sort knapper */
    color: #FFFFFF;
  }
`;

function TopMenu() {
  return (
    <Header>
      <StyledMenu>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/vision">Vision</StyledLink>
        </li>
        <li>
          <StyledLink to="/endpoints">Endpoints</StyledLink>
        </li>
      </StyledMenu>
    </Header>
  );
}

export default TopMenu;

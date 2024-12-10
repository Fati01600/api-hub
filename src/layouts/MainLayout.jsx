import { Outlet } from 'react-router';
import GlobalStyle from '../styles/GlobalStyle';
import styled from 'styled-components';
import TopMenu from '../components/TopMenu';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px; 
  width: 100%;
  margin: 0 auto; 
  border: 1px solid #ccc; 
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  background-color: #FF0000;
  color: white;
  padding: 1rem;
`;

const Footer = styled.footer`
  background-color: #282828;
  color: white;
  text-align: center;
  padding: 1rem;
`;

function MainLayout() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <TopMenu />
        </Header>
        <main>
          <Outlet />
        </main>
        <Footer>
          <p>&copy; 2024 MuzzPlayer</p>
          <p>API Hub v1.0</p>
        </Footer>
      </Container>
    </>
  );
}

export default MainLayout;

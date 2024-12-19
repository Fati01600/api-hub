import { Outlet, useLocation } from 'react-router';
import GlobalStyle from '../styles/GlobalStyle';
import styled from 'styled-components';
import TopMenu from '../components/TopMenu';
import LeftMenu from '../components/LeftMenu';
import background from '../assets/background.mp4';
import MusicPlayer from '../components/player/MusicPlayer';
import { useState } from 'react';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  width: 240px;
  background: rgba(34, 34, 34, 0.9);
`;

const ContentArea = styled.div`
  flex: 1;
  position: relative;
  overflow-y: auto;
`;

const BackgroundVideo = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  object-fit: cover;
`;

const OverlayBox = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  max-width: 1200px;
  margin: 20px auto;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

const Footer = styled.footer`
  background-color: #282828;
  color: white;
  text-align: center;
  padding: 1rem;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
`;

// 404 container
const PageNotFound = styled.div`
  margin-top: 120px; 
  text-align: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

function MainLayout() {
  const [selectedSong, setSelectedSong] = useState(null);
  const location = useLocation();

  return (
    <>
      <GlobalStyle />
      <LayoutWrapper>
        {/* TopMenu sender valgt sang */}
        <Header>
          <TopMenu onSongSelect={setSelectedSong} />
        </Header>

        {/* Main Content */}
        <MainContent>
          <Sidebar>
            <LeftMenu />
          </Sidebar>
          <ContentArea>
            <BackgroundVideo autoPlay loop muted>
              <source src={background} type="video/mp4" />
            </BackgroundVideo>
            <OverlayBox>
              {/* 404 Handling */}
              {location.pathname === '/randompath' ? (
                <PageNotFound>404 - Page Not Found</PageNotFound>
              ) : (
                <Outlet />
              )}
            </OverlayBox>
          </ContentArea>
        </MainContent>

        {/* MusicPlayer modtager valgt sang */}
        <MusicPlayer selectedSong={selectedSong} />

        {/* Footer */}
        <Footer>
          <p>&copy; 2024 MuzzPlayer</p>
          <p>API Hub Fifi</p>
        </Footer>
      </LayoutWrapper>
    </>
  );
}

export default MainLayout;

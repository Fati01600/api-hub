import { Outlet, useLocation } from "react-router";
import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";
import LeftMenu from "../components/LeftMenu";
import background from "../assets/background.mp4";
import MusicPlayer from "../components/player/MusicPlayer";
import { useState } from "react";
import { useUser } from "../api/UserContext";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const Sidebar = styled.div`
  width: 240px;
  background: rgba(34, 34, 34, 0.9);
`;

const MainContent = styled.div`
  flex: 1;
  position: relative;
  padding: 20px;
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

const Footer = styled.footer`
  background-color: #282828;
  color: white;
  text-align: center;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  left: 240px; 
  width: calc(100% - 240px); 
  z-index: 10;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
`;



const ErrorMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 69, 0, 0.9);
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  z-index: 20; 
`;

function MainLayout() {
  const [selectedSong, setSelectedSong] = useState(null);
  const location = useLocation();
  const { user } = useUser();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdmin = (user?.roles || []).includes("ADMIN");

  return (
    <>
      <GlobalStyle />
      <LayoutWrapper>
        {/* Top Menu */}
        <TopMenu onSongSelect={setSelectedSong} />

        {/* Content */}
        <ContentWrapper>
          {!isAdminRoute && !isAdmin && <Sidebar><LeftMenu /></Sidebar>}
          <MainContent>
            <BackgroundVideo autoPlay loop muted>
              <source src={background} type="video/mp4" />
            </BackgroundVideo>
            {location.pathname === "/randompath" ? (
              <ErrorMessage>404 - Page Not Found</ErrorMessage>
            ) : (
              <Outlet />
            )}
          </MainContent>
        </ContentWrapper>

        {/* Footer */}
        <Footer>
          <p>&copy; 2024 MuzzPlayer</p>
          <p>API Hub Fifi</p>
        </Footer>

        {/* Music Player */}
        <MusicPlayer selectedSong={selectedSong} />
      </LayoutWrapper>
    </>
  );
}

export default MainLayout;

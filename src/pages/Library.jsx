import styled from 'styled-components';
import background from '../assets/background.mp4';

const LibraryWrapper = styled.div`
  position: relative;
  text-align: center;
  color: white;
  min-height: 100vh;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 50px;
`;

const Section = styled.div`
  background: rgba(0, 0, 0, 0.6); 
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
`;

function Library() {
  return (
    <LibraryWrapper>
      <VideoBackground autoPlay loop muted>
        <source src={background} type="video/mp4" />
      </VideoBackground>
      <ContentWrapper>
        <Title>Your Music Library</Title>
        <Section>
          <h2>Playlists</h2>
          <p>Explore your saved playlists.</p>
        </Section>
        <Section>
          <h2>Favorites</h2>
          <p>Check out your favorite songs and artists.</p>
        </Section>
      </ContentWrapper>
    </LibraryWrapper>
  );
}

export default Library;

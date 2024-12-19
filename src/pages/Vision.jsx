import styled from 'styled-components';
import background from '../assets/background.mp4';

const VisionWrapper = styled.div`
  position: relative;
  text-align: center;
  color: white;
  margin: 20px 0;
  border-radius: 10px;
  overflow: hidden; 
  padding: 20px;
  
`;

const VideoBackground = styled.video`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5); 
  border-radius: 10px;
`;

const AnimatedText = styled.div`
  font-size: 1.5rem;
  color: white;
  margin-top: 150px; 
  animation: fadeIn 3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

function Vision() {
  return (
    <VisionWrapper>
      <VideoBackground autoPlay loop muted>
  <source src={background} type="video/mp4" />
 
</VideoBackground>
      <Content>
        <h1>Our Purpose</h1>
        <p>
          At MuzzPlayer, we aim to make music a personal and fun expirience. 
          Our goal is to help you create playlists that match your favorite genres, moods, or artists. 
          With our unique compatibility feature, you can see how much your playlists match with others and even find your musical soulmate. 
          Music is all about connection, and MuzzPlayer is here to bring people together through the songs they love.
        </p>
        <p>
        </p>
        <AnimatedText>Music is connection, music is love.</AnimatedText>
      </Content>
    </VisionWrapper>
  );
}

export default Vision;

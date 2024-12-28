import styled from "styled-components";
import background from "../assets/background.mp4";
import chillRnbImage from "../assets/ChillRnBSoul.jpg";
import danishHitsImage from "../assets/danishHitsImage.jpg";
import everythingImage from "../assets/everythingImage.jpg";

// Styles
const HomeWrapper = styled.div`
  position: relative;
  text-align: center;
  color: white;
  height: 100vh;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  max-width: 800px;
  margin: 50px auto;
`;

const Section = styled.div`
  margin: 20px 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
`;

const Card = styled.a`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 150px;
  height: 150px;
  display: inline-block;
  margin: 10px;
  text-decoration: none;
  color: #ffffff;
  border-radius: 10px;
  text-align: center;
  padding-top: 120px;
  font-weight: bold;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.4);
  }
`;

// Component
function Home() {
  const playlists = [
    {
      name: "Chill R&B/Soul",
      link: "https://www.youtube.com/watch?v=eQF7cqkiR6I&list=RDGMEMP-96bLtob-xyvCobnxVfyw&start_radio=1&rv=QUmxh7H8vok&ab_channel=SnohAalegra",
      image: chillRnbImage,
    },
    {
      name: "Danish Hits",
      link: "https://www.youtube.com/watch?v=HfmWPfqyYyY&list=PLVij4PBS_JBDJyKLwniJOh3aiw0et-w1b&ab_channel=TobiasRahim",
      image: danishHitsImage,
    },
    {
      name: "A Little Bit of Everything",
      link: "https://www.youtube.com/watch?v=6HNFGLCaVFI&list=RD6HNFGLCaVFI&start_radio=1&rv=6HNFGLCaVFI&ab_channel=ToryLanez",
      image: everythingImage,
    },
  ];

  return (
    <HomeWrapper>
      {/* Background Video */}
      <VideoBackground autoPlay loop muted>
        <source src={background} type="video/mp4" />
      </VideoBackground>

      {/* Content Section */}
      <ContentWrapper>
        <h1>Welcome to MuzzPlayer</h1>
        <p>Create playlists, share music, and discover your musical soulmate today.</p>
      </ContentWrapper>

      {/* Playlists Section */}
      <Section>
        <h2>Recent Played Playlists</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {playlists.map((playlist, index) => (
            <Card
              key={index}
              href={playlist.link}
              target="_blank"
              image={playlist.image}
            >
              {playlist.name}
            </Card>
          ))}
        </div>
      </Section>
    </HomeWrapper>
  );
}

export default Home;

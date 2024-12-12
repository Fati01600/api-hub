import styled from 'styled-components';
import chillRnbImage from '../assets/ChillRnBSoul.jpg';
import danishHitsImage from '../assets/DanishHitsImage.jpg';
import everythingImage from '../assets/everythingImage.jpg';
const HomeWrapper = styled.div`
  text-align: center;
  padding: 50px;
`;

const Hero = styled.div`
  background-color: #FF0000;
  padding: 50px;
  color: #FFFFFF;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin: 20px 0;
`;

const Card = styled.a`
  background-image: url(${(props) => props.image}); /* Baggrundsbillede */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 150px;
  height: 150px;
  display: inline-block;
  margin: 10px;
  text-decoration: none;
  color: #FFFFFF;
  border-radius: 5px;
  text-align: center;
  padding-top: 120px; 
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1); /* synes selv den er ret fed, Zoom-effekt ved hover */
    opacity: 0.9;
  }
`;

function Home() {
    const playlists = [
        {
          name: 'Chill R&B/Soul',
          link: 'https://www.youtube.com/watch?v=eQF7cqkiR6I&list=RDGMEMP-96bLtob-xyvCobnxVfyw&start_radio=1&rv=QUmxh7H8vok&ab_channel=SnohAalegra',
          image: chillRnbImage,
        },
    {
      name: 'Danish Hits',
      link: 'https://www.youtube.com/watch?v=HfmWPfqyYyY&list=PLVij4PBS_JBDJyKLwniJOh3aiw0et-w1b&ab_channel=TobiasRahim',
      image: danishHitsImage, 
    },
    {
      name: 'A Little Bit of Everything',
      link: 'https://www.youtube.com/watch?v=6HNFGLCaVFI&list=RD6HNFGLCaVFI&start_radio=1&rv=6HNFGLCaVFI&ab_channel=ToryLanez',
      image: everythingImage, 
    },
  ];

  return (
    <HomeWrapper>
      <Hero>
        <h1>Welcome to MuzzPlayer</h1>
        <p>Create playlists, share music, and discover your musical soulmate today</p>
      </Hero>
      <Section>
        <h2>Recent Played Playlists</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {playlists.map((playlist, index) => (
            <Card
              key={index}
              href={playlist.link}
              target="_blank"
              image={playlist.image} /* jeg sender playlist billedet som prop her */
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

/*import React from "react";
import styled from "styled-components";
import background from "../assets/background.mp4";
import { useLocation } from "react-router-dom";

const DetailsWrapper = styled.div`
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
  padding: 30px;
  margin: 100px 0;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
`;

const SongList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
`;

function PlaylistDetails() {
  const location = useLocation();
  const playlist = location.state?.playlist;

  if (!playlist) {
    return (
      <DetailsWrapper>
        <VideoBackground autoPlay loop muted>
          <source src={background} type="video/mp4" />
        </VideoBackground>
        <ContentWrapper>
          <Section>
            <Title>No Playlist Selected</Title>
            <p>Go back and select a playlist!</p>
          </Section>
        </ContentWrapper>
      </DetailsWrapper>
    );
  }

  return (
    <DetailsWrapper>
      <VideoBackground autoPlay loop muted>
        <source src={background} type="video/mp4" />
      </VideoBackground>
      <ContentWrapper>
        <Title>{playlist.name}</Title>
        <Section>
          <h2>Details</h2>
          <p>Mood: {playlist.mood}</p>
          <p>Genre: {playlist.genre}</p>
          <h3>Songs:</h3>
          <SongList>
            {playlist.songs.map((song, index) => (
              <li key={index}>
                {song.title} by {song.artist} ({song.genre})
              </li>
            ))}
          </SongList>
        </Section>
      </ContentWrapper>
    </DetailsWrapper>
  );
}

export default PlaylistDetails;*/

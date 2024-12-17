import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

// Styled Components
const PlayerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 240px;
  right: 0;
  background: #181818;
  padding: 10px 20px;
  color: white;
  z-index: 100;
`;

const SongInfo = styled.div`
  flex: 1;
  text-align: left;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  svg {
    cursor: pointer;
    font-size: 1.5rem;

    &:hover {
      color: #ff4500;
    }
  }
`;

const ProgressBar = styled.input`
  flex: 2;
  -webkit-appearance: none;
  height: 5px;
  background: #555;
  border-radius: 5px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    background: #ff4500;
    border-radius: 50%;
  }
`;

function MusicPlayer({ selectedSong }) { // Modtager selectedSong fra MainLayout
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0); //  0 som default
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tilføjer sang fra søgning, når selectedSong ændres
  useEffect(() => {
    if (selectedSong) {
      const newSong = {
        title: selectedSong.title,
        artist: selectedSong.artist,
        url: selectedSong.url,
      };
      setSongs([newSong]); // Sætter kun én sang i playlisten
      setCurrentIndex(0);
      audioRef.current.src = newSong.url;

      // Afspil og lyt efter metadata
      audioRef.current.play();
      setIsPlaying(true);
      setProgress(0);

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration); // Sætter varigheden
      };
    }
  }, [selectedSong]);

  // Play/Pause 
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Opdater sang ved index-ændring
  useEffect(() => {
    if (songs[currentIndex]?.url) {
      audioRef.current.src = songs[currentIndex].url;
      audioRef.current.play();
      setIsPlaying(true);
      setProgress(0);

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration); // Opdater varigheden ved ny sang
      };
    }
  }, [currentIndex, songs]);

  // Næste sang
  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  // Forrige sang
  const playPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  return (
    <PlayerWrapper>
      <SongInfo>
        <h4>{songs[currentIndex]?.title || 'No Song Loaded'}</h4>
        <p>{songs[currentIndex]?.artist || 'Unknown Artist'}</p>
      </SongInfo>
      <Controls>
        <FaStepBackward onClick={playPrevious} />
        {isPlaying ? (
          <FaPause onClick={togglePlayPause} />
        ) : (
          <FaPlay onClick={togglePlayPause} />
        )}
        <FaStepForward onClick={playNext} />
      </Controls>
      <ProgressBar
        type="range"
        min="0"
        max={duration} 
        value={progress}
        onChange={(e) => {
          const newTime = e.target.value;
          audioRef.current.currentTime = newTime;
          setProgress(newTime);
        }}
      />
    </PlayerWrapper>
  );
}

export default MusicPlayer;

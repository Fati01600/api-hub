import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

//MusicPlayer
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

// ProgressBar styles
const ProgressBarWrapper = styled.div`
  flex: 2;
  height: 5px;
  background: #555;
  border-radius: 5px;
  position: relative;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: #ff4500;
  border-radius: 5px;
  width: ${({ progress, duration }) => (progress / duration) * 100}%;
`;

// ProgressBar Component
const ProgressBar = ({ progress, duration, onChange }) => (
  <ProgressBarWrapper>
    <ProgressBarFill progress={progress} duration={duration} />
    <input
      type="range"
      min="0"
      max={duration}
      value={progress}
      onChange={(e) => onChange(e.target.value)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
        cursor: "pointer",
      }}
    />
  </ProgressBarWrapper>
);

function MusicPlayer({ selectedSong }) {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
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
      setSongs([newSong]);
      setCurrentIndex(0);
      audioRef.current.src = newSong.url;

      // Afspil og lyt efter metadata
      audioRef.current.play();
      setIsPlaying(true);
      setProgress(0);

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
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
        setDuration(audioRef.current.duration);
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

  // Opdater progress når sangen afspilles
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current?.currentTime) {
        setProgress(audioRef.current.currentTime);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

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
        progress={progress}
        duration={duration}
        onChange={(newTime) => {
          audioRef.current.currentTime = newTime;
          setProgress(newTime);
        }}
      />
    </PlayerWrapper>
  );
}

export default MusicPlayer;

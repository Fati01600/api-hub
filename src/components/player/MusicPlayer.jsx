import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaCompress } from "react-icons/fa";

const DraggablePlayer = styled.div`
  position: fixed;
  bottom: ${(props) => props.position.bottom}px;
  left: ${(props) => props.position.left}px;
  background: ${(props) => (props.isCollapsed ? "transparent" : "rgba(24, 24, 24, 0.95)")};
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  color: white;
  width: ${(props) => (props.isCollapsed ? "60px" : "320px")};
  height: ${(props) => (props.isCollapsed ? "60px" : "auto")};
  padding: ${(props) => (props.isCollapsed ? "10px" : "20px")};
  z-index: 1000;
  cursor: ${(props) => (props.isCollapsed ? "pointer" : "grab")};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.isCollapsed ? "center" : "space-between")};
  gap: ${(props) => (props.isCollapsed ? "0" : "15px")};
  user-select: none;
`;

const SongInfo = styled.div`
  h4 {
    margin: 0;
    font-size: 1rem;
    color: #ff4500;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: #ccc;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    font-size: 1.8rem;
    cursor: pointer;

    &:hover {
      color: #ff4500;
    }
  }
`;

const ProgressBar = styled.input`
  width: 100%;
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

function MusicPlayer({ selectedSong }) {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [position, setPosition] = useState({ left: 20, bottom: 20 });
  const playerRef = useRef(null);

  
  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem("musicPlayerPosition"));
    if (savedPosition) {
      setPosition(savedPosition);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("musicPlayerPosition", JSON.stringify(position));
  }, [position]);

  
  useEffect(() => {
    if (selectedSong) {
      audioRef.current.src = selectedSong.url;
      setProgress(0); 
      audioRef.current.play();
      setIsPlaying(true);

      
      audioRef.current.ontimeupdate = () => {
        setProgress(audioRef.current.currentTime);
      };

      
      audioRef.current.onended = () => {
        setProgress(0);
        setIsPlaying(false);
      };
    }
  }, [selectedSong]);

  
  const handleMouseDown = (e) => {
    e.preventDefault();
    const player = playerRef.current;
    const initialX = e.clientX - player.getBoundingClientRect().left;
    const initialY = e.clientY - player.getBoundingClientRect().top;

    const onMouseMove = (event) => {
      const newLeft = event.clientX - initialX;
      const newBottom = window.innerHeight - event.clientY - player.offsetHeight + initialY;

      setPosition({
        left: Math.max(0, Math.min(newLeft, window.innerWidth - player.offsetWidth)),
        bottom: Math.max(0, Math.min(newBottom, window.innerHeight - player.offsetHeight)),
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
    });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <DraggablePlayer
      ref={playerRef}
      onMouseDown={handleMouseDown}
      position={position}
      isCollapsed={isCollapsed}
    >
      {isCollapsed ? (
        <FaCompress onClick={toggleCollapse} />
      ) : (
        <>
          <SongInfo>
            <h4>{selectedSong?.title || "No Song Loaded"}</h4>
            <p>{selectedSong?.artist || "Unknown Artist"}</p>
          </SongInfo>
          <Controls>
            <FaStepBackward />
            {isPlaying ? (
              <FaPause onClick={() => setIsPlaying(false)} />
            ) : (
              <FaPlay onClick={() => setIsPlaying(true)} />
            )}
            <FaStepForward />
          </Controls>
          <ProgressBar
            type="range"
            min="0"
            max={audioRef.current.duration || 0}
            value={progress}
            onChange={(e) => {
              const newTime = e.target.value;
              audioRef.current.currentTime = newTime;
              setProgress(newTime);
            }}
          />
          <FaCompress onClick={toggleCollapse} style={{ alignSelf: "flex-end" }} />
        </>
      )}
    </DraggablePlayer>
  );
}

export default MusicPlayer;

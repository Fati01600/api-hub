import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { FaHeart } from "react-icons/fa";


const fillHeart = (percentage) => keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: ${percentage}%;
  }
`;


const CompatibilityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffccdc;
`;


const Title = styled.h1`
  font-size: 2.5rem;
  color: #d60036;
  margin-bottom: 20px;
  text-shadow: 2px 2px #ffffff;
`;


const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;


const Input = styled.input`
  padding: 10px;
  width: 150px;
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 1rem;
  text-align: center;
`;


const TestButton = styled.button`
  background-color: #ff007f;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 0, 127, 0.5);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    background-color: #ff3399;
  }
`;


const HeartContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin-top: 20px;
`;


const HeartIcon = styled(FaHeart)`
  font-size: 150px;
  color: #d60036;
  position: absolute;
  top: 0;
  left: 0;
`;


const HeartFill = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #ff69b4;
  animation: ${({ percentage }) => fillHeart(percentage)} 2s ease-in-out forwards;
  border-radius: 50% 50% 0 0;
`;


const ResultText = styled.p`
  margin-top: 15px;
  font-size: 1.2rem;
  color: #d60036;
`;

function Compatibility() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [compatibility, setCompatibility] = useState(0);
  const [resultMessage, setResultMessage] = useState("");

  const checkCompatibility = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/users/${user1}/compatibility/${user2}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
        }
      );
      const percentage = response.data; 
      setCompatibility(percentage);

      if (percentage >= 80) {
        setResultMessage("80-100%: 🎉 I smell love in the air, if you havent been on a date yet? what are you waiting for?");
      } else if (percentage >= 50) {
        setResultMessage("50-79%: 😎 uhuhuuu good match!");
      } else {
        setResultMessage("0-49%: 😢 Not everyone is meant to be");
      }
    } catch (error) {
      console.error("Error fetching compatibility:", error);
      setResultMessage("Error fetching compatibility. Try again.");
    }
  };

  return (
    <CompatibilityWrapper>
      <Title>Music Match Tester</Title>

      <InputContainer>
        <Input
          type="text"
          placeholder="Your Username"
          value={user1}
          onChange={(e) => setUser1(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Friend's Username"
          value={user2}
          onChange={(e) => setUser2(e.target.value)}
        />
      </InputContainer>

      <TestButton onClick={checkCompatibility}>💖 TEST 💖</TestButton>

      <HeartContainer>
        <HeartIcon />
        <HeartFill percentage={compatibility} />
      </HeartContainer>

      {resultMessage && <ResultText>{resultMessage}</ResultText>}
    </CompatibilityWrapper>
  );
}

export default Compatibility;

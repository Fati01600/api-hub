import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom"; 


const Wrapper = styled.div`
  display: grid; 
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  place-items: center; 
`;

const FormContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px #ff4500;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #444;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  &:focus {
    outline: none;
    border-color: #ff4500;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: linear-gradient(45deg, #ff4500, black);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: black;
    transform: translateY(-3px); 
  }
`;

const Error = styled.p`
  color: red;
  text-align: center;
`;

const LinkText = styled.p`
  color: white;
  text-align: center;
  margin-top: 10px;

  a {
    color: #ff4500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post(import.meta.env.VITE_URL + "/auth/register", {
        username,
        password,
      });
      setSuccess("Account successfully created!");
      setError("");

      setTimeout(() => {
        window.location.href = "/login"; 
      }, 2000);
    } catch (err) {
      console.error("Error registering user:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Wrapper>
      <FormContainer>
        <h2 style={{ color: "white", textAlign: "center" }}>Register</h2>
        {error && <Error>{error}</Error>}
        {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Register</Button>
        <LinkText>
          Already have an account? <Link to="/login">Log in here</Link>
        </LinkText>
      </FormContainer>
    </Wrapper>
  );
}

export default Register;

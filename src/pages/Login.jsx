import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../api/AuthApi"; 
import { useUser } from "../api/UserContext"; 
import { useNavigate } from "react-router-dom";

// Styled components
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const Box = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px #ff4500;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 80%;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ff4500;
  }
`;

const Button = styled.button`
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #ff4500;
  }
`;

const Link = styled.span`
  color: #ff4500;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(username, password); 
      localStorage.setItem("jwt_token", response.token);
      localStorage.setItem("user_info", JSON.stringify(response));
      setUser({ username: response.username, roles: response.roles }); 
      navigate("/"); 
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <Wrapper>
      <Box>
        <h2 style={{ color: "white" }}>Login</h2>
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
        <Button onClick={handleLogin}>Login</Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          <Link>Forgot password?</Link>
        </p>
      </Box>
    </Wrapper>
  );
}

export default Login;

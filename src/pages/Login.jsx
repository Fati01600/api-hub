import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../api/AuthApi"; 
import { useUser } from "../api/UserContext"; 
import { useNavigate, Link } from "react-router-dom"; 


const Wrapper = styled.div`
  display: grid; 
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  place-items: center;
`;

const Box = styled.div`
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
`;

const Input = styled.input`
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
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
  background: linear-gradient(45deg, #ff4500, black);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%; 
  transition: background 0.3s ease;

  &:hover {
    background: black;
  }
`;

const LinkText = styled.p`
  margin-top: 10px;
  text-align: center;
  color: white;

  a {
    color: #ff4500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Login Component
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
      localStorage.setItem("roles", JSON.stringify(response.roles));

      setUser({ username: response.username, roles: response.roles });

      // Redirect based on role
      if (response.roles.includes("ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
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
        <LinkText>
          Don't have an account? <Link to="/register">Register here</Link>
        </LinkText>
      </Box>
    </Wrapper>
  );
}

export default Login;

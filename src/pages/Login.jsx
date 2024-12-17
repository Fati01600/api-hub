// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styled from "styled-components";

//Login, forgot password, signin er samlet her via useState
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
  const [view, setView] = useState("login"); // Skifter mellem login, forgot og signin

  const renderForm = () => {
    switch (view) {
      case "forgot":
        return (
          <>
            <h2 style={{ color: "white" }}>Forgot Password</h2>
            <Input type="email" placeholder="Enter your email" />
            <Button>Reset Password</Button>
            <p style={{ color: "white" }}>
              Remembered your password?{" "}
              <Link onClick={() => setView("login")}>Back to Login</Link>
            </p>
          </>
        );
      case "signup":
        return (
          <>
            <h2 style={{ color: "white" }}>Sign Up</h2>
            <Input type="text" placeholder="Username" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button>Sign Up</Button>
            <p style={{ color: "white" }}>
              Already have an account?{" "}
              <Link onClick={() => setView("login")}>Login</Link>
            </p>
          </>
        );
      default:
        return (
          <>
            <h2 style={{ color: "white" }}>Login</h2>
            <Input type="text" placeholder="Username or Email" />
            <Input type="password" placeholder="Password" />
            <Button>Login</Button>
            <p>
              <Link onClick={() => setView("forgot")}>Forgot password?</Link>
            </p>
            <p style={{ color: "white" }}>
              Don’t have an account?{" "}
              <Link onClick={() => setView("signup")}>Sign in</Link>
            </p>
          </>
        );
    }
  };

  return (
    <Wrapper>
      <Box>{renderForm()}</Box>
    </Wrapper>
  );
}

export default Login;

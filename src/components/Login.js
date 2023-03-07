import React, { useState } from "react";
import styled from "styled-components";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault(); // prevent form from refreshing on submit(default form action)
    // handle login logic here
  }

  const handleRegister = (e) => {
    e.preventDefault();
    // handle register logic here
  };
  return (
    <Wrapper>
      <Title>Ada Lovelace Journal</Title>
      <LoginForm onSubmit={handleLogin}>
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
        <Button type="submit">Login</Button>
      </LoginForm>
      <RegisterButton onClick={handleRegister}>Register</RegisterButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
`;

const Input = styled.input`
  padding: 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  width: 100%;
`;

const Button = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #0069d9;
  }
`;

const RegisterButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: green;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

export default Login;

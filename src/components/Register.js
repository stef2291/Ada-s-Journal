import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const { name, password, confirmPassword } = formData;

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //e.target.name could be the key for `name`, `password` or `confirmPassword`
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/users", {
        name,
        password,
      });
      console.log(response.data);
      alert("Registration successful");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  }

  return (
    <Wrapper>
      <FormContainer>
        <FormTitle>Register</FormTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="name">Username</FormLabel>
            <FormInput
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <FormInput
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormButton type="submit">Register</FormButton>
        </Form>
      </FormContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
  }
`;

const FormButton = styled.button`
  background-color: #0077cc;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
`;

export default RegisterPage;

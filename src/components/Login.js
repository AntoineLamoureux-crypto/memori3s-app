import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Container,
    Text,
    Box,
    Link,
    useForceUpdate
  } from '@chakra-ui/react'


function Login() {

  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
  const navigate = useNavigate();

	function handleChange(event) {
    const {name, value} = event.target
    setData(prevInput => {
      return ({
        ...prevInput,
        [name] : value,
      });
    });
  }

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  }, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
    const userCredentials = {
        email : data.email,
        password : data.password,
    }
    try {
        const { data: res } = await axios.post('https://memories-back3nd.herokuapp.com/auth', userCredentials);
		    localStorage.setItem("token", res.data);
		    window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
		
	};



  return (
    <Container boxSize={'container.xl'} textAlign={'center'} mt={'10'} >
      <Stack spacing="6">
          <Text fontSize={'xx-large'} fontWeight={'bold'}>Login Form</Text>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input name="email" type="text" required value={ data.email } onChange={ handleChange } />
          </FormControl>
          <FormControl id="password">
          <FormLabel>Password</FormLabel>
            <Input name="password" type="password" required value={ data.password } onChange={ handleChange } />
          </FormControl>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Button type="submit" colorScheme="blue" size="lg" fontSize="md" onClick={ handleSubmit }>
            Sign in
          </Button>
          <Box>
              <Text textColor={ "black" }>Don't have an account ?</Text>
              <Text>Sign up
                  <Link ml='1' onClick={ () => navigate('/signup') }>here</Link>
              </Text>
          </Box>
      </Stack>
  </Container>
  );
}

export default Login;

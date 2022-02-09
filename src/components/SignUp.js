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
    Link
  } from '@chakra-ui/react'

function SignUp() {
    
    const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	const navigate = useNavigate();

    const handleSubmit = async (e) =>  {
        e.preventDefault()
        const newUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        }
        try {
            await axios.post('https://memories-back3nd.herokuapp.com/users', newUser);
            navigate("/login");
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) { setError(error.response.data.message) }
        }
    }

    useEffect(() => {
        localStorage.removeItem("token");
    });

    function handleChange(event) {
        const {name, value} = event.target
        setData(prevInput => {
            return ({
                ...prevInput,
                [name] : value,
            });
        });
    }

    return (
        <Container boxSize={'container.xl'} textAlign={'center'} mt={'10'} >
            <Stack spacing="6">
                <Text fontSize={'xx-large'} fontWeight={'bold'}>Sign up Form</Text>
                <FormControl id="firstName">
                    <FormLabel>First Name</FormLabel>
                    <Input name="firstName" type="text" required value={ data.firstName } onChange={ handleChange } />
                </FormControl>
                <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input name="lastName" type="text" required value={ data.lastName } onChange={ handleChange }/>
                </FormControl>
                <FormControl id="email">
                <FormLabel>Email</FormLabel>
                    <Input name="email" type="text" required value={ data.email } onChange={ handleChange }/>
                </FormControl>
                <FormControl id="password">
                <FormLabel>Password</FormLabel>
                    <Input name="password" type="password" required value={ data.password } onChange={ handleChange }/>
                </FormControl>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <Button onClick= { handleSubmit } colorScheme="blue" size="lg" fontSize="md">
                    Sign up
                </Button>
                <Box>
                    <Text textColor={ "black" }>Already have an account ?</Text>
                    <Text  >Sign in
                        <Link ml='1' onClick={ () => navigate('/login') }>here</Link>
                    </Text>
                </Box>
            </Stack>
        </Container>
    );
}

export default SignUp;

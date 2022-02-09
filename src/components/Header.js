import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";



function Header() {
  const navigate = useNavigate();

  function onLogoutClick() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate('/login')
  }

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding={6} bgGradient='linear(to-r, blue.300, blue.200, blue.100)'>
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"} textColor={'black'} mr={'10'} onClick={ () => navigate('/')} >
          Memories Manager
        </Heading>
      </Flex>
      <Stack direction={{ base: "column", md: "row" }} width={{ base: "full", md: "auto" }} alignItems="center" flexGrow={1} mt={{ base: 4, md: 0 }}>
        <Button variant="link" textColor={'white'} fontWeight={'bold'} _hover={{ textColor:'black', opacity:'1'}} fontSize={'20px'} mx={'3'} onClick={ () => navigate('/memories')} >Add Memory</Button>
        <Button variant="link" textColor={'white'} fontWeight={'bold'} _hover={{ textColor:'black', opacity:'1'}} fontSize={'20px'} onClick={ () => navigate('/all-memories')} >View Memories</Button>
      </Stack>
      <Box mt={{ base: 4, md: 0 }}>
        <Button variant="outline" _hover={{ bg: "gray.200", textColor:'black'}} textColor={'white'} onClick={ onLogoutClick } >
            Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;

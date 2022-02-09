import React from 'react';
import { Container } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack,
  FormLabel,
  Grid
} from "@chakra-ui/react";


const ViewMemoryDetails = () => {
  const location = useLocation()
  const navigate = useNavigate();
  return <>
  <Container maxW={'30%'} mt='5'>
    <Box p={4}
      display= "flex"
      maxWidth="100%"
      borderWidth={1}
      margin={2}
    >
      <Grid templateColumns={'repeat(2, 1fr)'}>
        <Box>
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.600"
        >Details</Text>
        <FormLabel>Memory Title : </FormLabel>
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="md"
          letterSpacing="wide"
          color="teal.400"
        >
          {location.state.title}
        </Text>
        <FormLabel>Memory Notes : </FormLabel>
        <Text my={2} color="gray.500">
          {location.state.notes}
        </Text>
        <FormLabel>Memory ID : </FormLabel>
        <Link
          my={1}
          display="block"
          fontSize="md"
          lineHeight="normal"
          fontWeight="semibold"
          href="#"
        >
        {location.state.user}
        </Link>
        <Button maxWidth="100%" my={2} onClick={() => navigate('/memories')}>
          Return
        </Button>
      </Stack>
      </Box>
      <Box>
        <img src={location.state.selectedFile} />
      </Box>
      </Grid>
    </Box>
    </Container>
  </>
}

export default ViewMemoryDetails;

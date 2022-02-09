import React from 'react';
import { Grid, Box, HStack, Text, Button, Input, Container, FormControl } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Memory from './Memory'
import FileBase from 'react-file-base64';
import _ from 'lodash';

function Memories() {
    const _id = JSON.parse(localStorage.getItem('currentUser'))._id;

    const [memo, setMemo] = useState(
        {
          user: '',
          title: '',
          notes: '',
          selectedFile: ''
        }
      );
      const [memos, setMemos] = useState([
        {
          user: "",
          title: "",
          notes: "",
          selectedFile: '',
          _id: "",
        }
      ]);
    
      const [isPut, setIsPut] = useState(false);
      const [updatedMemo, setUpdatedMemo] = useState({
        title: "",
        notes: "",
        id: "",
      });
    
      useEffect(() => {
        const _id = JSON.parse(localStorage.getItem('currentUser'))._id
        fetch(`https://memories-back3nd.herokuapp.com/memos/${_id}`)
        .then(response => response.json())
        .then(data => {
          _.forEach(data, function(value) {
            value.selectedFile = atob(value.selectedFile);
          });
          setMemos(data)
        })
        .catch((err) => console.log(err))
      }, [memos]);
    
      function handleChange(event) {
        const {name, value} = event.target
        setMemo(prevInput => {
          return ({
            ...prevInput,
            [name] : value,
          });
        });
      }
    
      function addMemo(event) {
        event.preventDefault()
        const userId = JSON.parse(localStorage.getItem('currentUser'))._id;
        const encodedSelectedFile = btoa(memo.selectedFile)
        const newFood = {
          user: userId,
          title: memo.title,
          notes: memo.notes,
          selectedFile: encodedSelectedFile
        };
        axios.post('http://localhost:3001/newMemo', newFood)
        setMemo({
          user: '',
          title: "",
          notes: "",
          selectedFile: ""
        });
      }
    
      function deleteMemo(id) {
        axios.delete("/delete/" + id);
        alert("Memory deleted");
        console.log(`Deleted memory with id ${id}`);
      }
    
      function updateMemo(id) {
        axios.put("/put/" + id, updatedMemo);
        alert("Memory updated");
        console.log(`Memory with id ${id} updated`);
        setUpdatedMemo({
          title: "",
          notes:"",
          id: "",
        });
      }
    
      function openUpdate(id) {
        setIsPut(true);
        setUpdatedMemo(prevInput => {
          return (
            {
              ...prevInput,
              id: id,
            }
          );
        });
      }
    
      function updateMemo(id) {
          axios.put('/put/' + id, updatedMemo)
          alert("Food updated !")
          setIsPut(false)
    
          setMemo({
            title: "",
            notes: "",
            selectedFile: ""
          });
      }
    
      function handleUpdate(event) {
        const { name, value } = event.target;
        setUpdatedMemo(prevInput => {
          return ({
            ...prevInput,
            [name] : value
          })
        })
      } 
      
  return (
    <Grid h={'max'} w='100%' borderBottomRadius={'lg'} templateColumns='repeat(2, 1fr)' justifyItems={'center'}>
        {!isPut ? 
        (<Box flexDirection={"column"} textAlign={'center'} mt='150px'borderRadius={'lg'} bgColor='gray.100' w={'60%'} _hover={{boxShadow:'xl'}} boxSize='fit-content'>
          <Container boxSize={'container.xl'} h={'fill-content'} mt={'10'}>
            <Box mb={'3'}>
              <Text fontStyle={'oblique'} fontSize={'xxx-large'} fontWeight={'semibold'}>Save new Memory</Text>
            </Box>
              <FormControl isRequired mb={'5'}>
                  <Input onChange={ handleChange } name="title" value={ memo.title } placeholder='Memory title' borderColor={'black'}></Input>
              </FormControl>
              <FormControl isRequired mb={'5'}>
                  <Input onChange={ handleChange } name="notes" value={ memo.notes } placeholder='Memory notes' borderColor={'black'}></Input>
              </FormControl>
              <Box display={'flex'} justifyContent='center'>
                  <FileBase type="file" multiple={false} onDone={({ base64 }) => setMemo({ ...memo, selectedFile: base64 })} />
              </Box>
            <Box  mt={'3'}>
                <Button borderRadius={'md'} boxSize={'full'} h={'max-content'} py={'2'} onClick={ addMemo } _hover={{bgColor: 'blue.200'}} mb='5' m='5'>Save</Button>
            </Box>
          </Container>
        </Box>) : (
          <Box flexDirection={"column"} alignItems={'center'} textAlign={'center'}>
            <Container boxSize={'container.md'} h={'fit-content'} >
              <Text  as='as' fontSize={'xxx-large'} fontWeight={'semibold'} >Edit</Text>
              <Input mb={'5'} onChange={ handleUpdate } name="foodName" value={ updatedMemo.foodName } placeholder='Food name' borderColor={'black'}></Input>
              <Input mb={'5'} onChange={ handleUpdate } name="foodColor" value={ updatedMemo.foodColor } placeholder='Food color' borderColor={'black'}></Input>
              <Box mt={'3'}>
                <Button onClick={() => updateMemo(updatedMemo.id)} colorScheme={'blue'}>Update</Button>
              </Box>
            </Container>
        </Box>
       )}
       <Box justifySelf={'flex-end'} w='80%'>
         <Box bgColor={'gray.300'} h='50px' borderTopLeftRadius={'lg'} mb='3'>
          <Text mt={'10'} fontSize='20px' fontWeight={'bold'} mx='5' pt='2'>Your Memories</Text>
        </Box>
       <Box overflowX="auto" h={'lg'} borderBottomRadius={'10px'}
            sx={{ '&::-webkit-scrollbar': { width: '16px', backgroundColor: `rgba(0, 0, 0, 0.05)`,},
                  '&::-webkit-scrollbar-thumb': { backgroundColor: `rgba(0, 0, 0, 0.05)`}}}
        > 
        <Grid templateColumns={'repeat(2, 1fr)'} gap={'5'} alignContent={'center'} mb='10' mx={'5'}>
            { memos.length !== 0 ?
                memos.map((memory) => { return ( <Memory key={ memory._id } memo={memory} openUpdate={openUpdate} deleteMemo={deleteMemo} /> )}) :
                <Text textColor={'black'}>No memories yet</Text>
            }
        </Grid>
        </Box>
        </Box>
    </Grid>
  );
}

export default Memories;

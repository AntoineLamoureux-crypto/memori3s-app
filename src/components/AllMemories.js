import React from 'react';
import { Grid, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import MemoryV2 from './MemoryV2'
import _ from 'lodash';

function AllMemories() {
    const [memos, setMemos] = useState([
        {
          user: "",
          title: "",
          notes: "",
          selectedFile: '',
          _id: "",
        }
    ]);

    useEffect(() => {
        const _id = JSON.parse(localStorage.getItem('currentUser'))._id
        if (memos === null) {
        fetch(`https://memories-back3nd.herokuapp.com/memos/${_id}`)
        .then(response => response.json())
        .then(data => {
          _.forEach(data, function(value) {
            value.selectedFile = atob(value.selectedFile);
          });
          setMemos(data)
        })
        .catch((err) => console.log(err))
        }
      }, [memos]);
      

  return <>
   <Grid templateColumns={'repeat(2, 1fr)'} gap={'5'} alignContent={'center'} mb='10' mx={'5'}>
            { memos.length !== 0 ?
                memos.map((memory) => { return ( <MemoryV2 key={ memory._id } memo={memory} /> )}) :
                <Text textColor={'black'}>No memories yet</Text>
            }
        </Grid>
  </>;
}

export default AllMemories;

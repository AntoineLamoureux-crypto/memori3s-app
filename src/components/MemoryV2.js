import React from 'react';
import { Box, Text, Input, Container  } from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon } from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom";

function MemoryV2({memo}) {
  const [showView, setShowView] = useState(false)
  const navigate = useNavigate();

  function onPictureHover(e) {
      e.preventDefault()
      setShowView(!showView)
  }

  return (
      <Container mt={'5'}>
        <Box key={ memo._id } borderRadius={'xl'} boxSize={'-webkit-max-content'} width={'100%'} border='1px white'  bgColor={'gray.100'}>
            <Box maxH={'70px'} w='100%' borderTopRadius={'xl'} overflow='clip' onMouseEnter={ onPictureHover } onMouseLeave={ onPictureHover }  _hover={{boxShadow: 'xl'}}>
                {showView ? <ViewIcon overflow={'inherit'} position='absolute' color={'white'} px='3' py={'3'} onClick={() => navigate('/viewDetails',{state: memo})}  _hover={{boxShadow: 'xl', zIndex: 2, cursor: 'pointer'}}/> : <></>}
                <Box>
                    <img src={memo.selectedFile} />
                </Box>
            </Box>
            <Box mx={'4'}>
                <Text textColor={'black'} mt='4' fontWeight={'semibold'}>Memory Location</Text>
                <Input _placeholder={{ color: 'black', fontWeight:'semibold' }} variant='flushed' isReadOnly size='md' placeholder={memo.title} my='2' color={'black'} borderColor={'black'}/>
            </Box>
            <Box mx={'4'}>
                <Text textColor={'black'} fontWeight={'semibold'} >Notes</Text>
                <Input _placeholder={{ color: 'black', fontWeight:'semibold' }}  variant='flushed' isReadOnly size='md' placeholder={memo.notes} my='2' borderColor={'black'}  mb='5'/>
            </Box>
            <Box>
            </Box>
        </Box>
    </Container>
  );
}

export default MemoryV2;

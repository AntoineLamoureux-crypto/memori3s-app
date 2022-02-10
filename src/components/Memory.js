import React from 'react';
import { Box, Text, Button, Input, Container  } from '@chakra-ui/react'

function Memory({memo, deleteMemo, openUpdate}) {
  return (
      <Container mt={'5'}>
        <Box key={ memo._id } borderRadius={'xl'} boxSize={'-webkit-max-content'} width={'100%'} border='1px white'  bgColor={'gray.100'} >
            <Box mx={'4'}>
                <Text textColor={'black'} fontWeight={'semibold'} pt={'3'}>Memory Location</Text>
                <Input _placeholder={{ color: 'black', fontWeight:'semibold' }} variant='flushed' isReadOnly size='md' placeholder={memo.title} my='2' color={'black'} borderColor={'black'}/>
            </Box>
            <Box mx={'4'}>
                <Text textColor={'black'} fontWeight={'semibold'} >Notes</Text>
                <Input _placeholder={{ color: 'black', fontWeight:'semibold' }}  variant='flushed' isReadOnly size='md' placeholder={memo.notes} my='2' borderColor={'black'}/>
            </Box>
            <Box>
            <Box display={'inline-flex'} w='100%' borderTop='1px' justifyContent={'center'} borderBottomRadius={'lg'} mt='2' mb={'3'}>
                <Box my={'1'} mt='2' mx='5' alignItems='center' >
                    <Button mx="1" my='1' onClick={() => deleteMemo(memo._id)} borderRadius={'5px'} bgColor={'red.200'} fontWeight={'bold'} _hover={{bgColor:'red.300'}}>DELETE</Button>
                </Box>
                <Box my={'1'} mt='2' mx={'5'}>
                    <Button mx="1" my='1' onClick={() => openUpdate(memo._id)} borderRadius={'5px'} bgColor={'green.200'} fontWeight={'bold'} _hover={{bgColor:'green.300'}}>UPDATE</Button>
                </Box>
            </Box>
            </Box>
        </Box>
    </Container>
  );
}

export default Memory;

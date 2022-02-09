import { Box, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'

function Footer() {
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
    <Stack>
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Text>This is the footer</Text>
      </Stack>
    </Stack>
  </Box>
  );
}

export default Footer;

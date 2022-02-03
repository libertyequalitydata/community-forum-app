import React from 'react';
import Status from "./Status";

import { useNavigate } from 'react-router-dom';
import {Box, Flex, Heading, Spacer, Link} from '@chakra-ui/react'


const Navbar=() => {
      const [loggedin, setLoggedin] = React.useState(false)
      let navigate = useNavigate();
      const toHome = () =>{
        navigate('/');
      }
      return (
        // <Box bg='tomato' w='100%' p={4} color='white'>
        //     <p>Test Nav Bar</p>
        //     <Status />
        // </Box>

        <Flex>
          <Box p='2'>
            <Heading size='md' as='button' onClick={toHome} >Test Nav Bar</Heading>
          </Box>
          <Spacer />
          <Status/>


        </Flex>


      );
  }

  export default Navbar;
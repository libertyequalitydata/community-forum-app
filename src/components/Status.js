import React, {useState, useContext, useEffect } from "react";
import { AccountContext } from "./Account";
import { useNavigate, useLocation } from 'react-router-dom';
import {Box, Button, Flex, Heading, Spacer} from '@chakra-ui/react'


const Status = () => {
    const [status, setStatus] = useState(false);
    const [loggedOut, setLoggedOut] = useState(false);
    const {getSession, logout, getUser} = useContext(AccountContext);
    let navigate = useNavigate();
    useEffect(()=>{
        setStatus(false)
        getSession().then(session=>{
            console.log("Session ", session );
            setStatus(true);
        })
        console.log("Test")
    }, [useLocation()||loggedOut])

    function signup() {
        navigate('/signup')
      }

      function loggingOut() {
        logout()
        setLoggedOut(!loggedOut)
        navigate('/')
      }

    function login() {
        navigate('/login')
      }
    return <Box>{status ? <Box>Currently Signed in as {getUser()}<Button onClick={loggingOut} colorScheme='teal'>Logout</Button></Box>: <Box><Button onClick={signup} colorScheme='teal'>Signup</Button><Button onClick={login} colorScheme='teal'>Login</Button></Box>}</Box>
    
}

export default Status;
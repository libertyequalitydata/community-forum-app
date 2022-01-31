import React, {useState} from "react";
import UserPool from "../UserPool";
import { useNavigate } from 'react-router-dom';
import {Form, Box, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button} from '@chakra-ui/react';

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const isError = email === ''
    const dataEmail = {
        Name: 'email',
        Value: email 
    }
    const navigate = useNavigate();
    const onSubmit = (event) => {
        event.preventDefault();
        
        UserPool.signUp(username, password, [dataEmail], null, (err,data) => {
            if (err) {
                setError(err.name)
                console.log(err);
                if (err.name == "InvalidParameterException"){
                    if (err.message.includes('Member must satisfy regular expression pattern')){
                        console.log("")
                    }


                } else if (err.name ===  "InvalidPasswordException"){
                    console.log("Password not long enough")
                }
                

                
            } else {

                console.log(data);
                
                navigate(-1)
            }
            

        });
    };

    return (
        <Box>
            {/* <form onSubmit={onSubmit}>
                <label>Username:</label>
                <input
                value={username}
                onChange={(event)=> setUsername(event.target.value)}
                ></input>
                <label>Email:</label>
                <input
                value={email}
                onChange={(event)=> setEmail(event.target.value)}
                ></input>
                <label>Password:</label>
                <input
                value={password}
                onChange={(event)=> setPassword(event.target.value)}
                type="password"
                ></input>

                <button type="submit">Signup</button>
            </form> */}
            <form onSubmit={onSubmit}>
                <FormControl isRequired>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input value={username} onChange={(event)=> setUsername(event.target.value)}  placeholder="example" />
                    <FormHelperText>
                    Enter your desired username
                    </FormHelperText>
                </FormControl>
                <FormControl isRequired isInvalid={isError}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input value={email} type="email" onChange={(event)=> setEmail(event.target.value)} placeholder="example@example.com"/>
                    <FormHelperText>
                    Enter your desired email 
                    </FormHelperText>
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                    
                </FormControl>
                <FormControl isRequired isInvalid={error==="InvalidPasswordException"}>
                        
                    <FormLabel htmlFor="passowrd">Password</FormLabel>
                    <Input value={password} type="password" onChange={(event)=> setPassword(event.target.value)} placeholder="*************" />
                    <FormHelperText>
                    Enter a strong password 
                    </FormHelperText>
                    
                </FormControl>
                        <Button
                            mt={4}
                            colorScheme='teal'
                            type='submit'

                        >
                            Submit
                        </Button>
            </form>

        </Box>

    );
};

export default Signup;
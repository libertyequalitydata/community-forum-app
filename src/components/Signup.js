import React, {useState} from "react";
import UserPool from "../UserPool";
import { useNavigate } from 'react-router-dom';
import {CircularProgress, Alert, AlertIcon, AlertTitle, AlertDescription,CloseButton, Box, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button} from '@chakra-ui/react';

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState({name: ''})
    
    const [isLoading, setIsLoading] = useState(false)
    
    const signuperror = error.name !== '' 
    const isError = email === ''
    const dataEmail = {
        Name: 'email',
        Value: email 
    }
    const navigate = useNavigate();
    
    const close = ()=> {
        setError({name: ''})
    };
    const onSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
        
        UserPool.signUp(username, password, [dataEmail], null, (err,data) => {
            if (err) {
                
                setError(err)
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
            setIsLoading(false)

        });
    };

    return (
        <Box>
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
                                {isLoading ? (
                                    <CircularProgress isIndeterminate size="24px" color="teal" />
                                ) : (
                                    'Sign Up'
                                )
                                }
                        </Button>
            </form>
            {signuperror ?(
                                    <Alert status='error'>
                                    <AlertIcon />
                                    <AlertTitle mr={2}>There was a problem signing up!</AlertTitle>
                                    <AlertDescription>{error.message}</AlertDescription>
                                    <CloseButton as="button" position='absolute' right='8px' top='8px' onClick={close}/>
                                    </Alert>
                ) : (
                    <br/>
                )
                }

        </Box>

    );
};

export default Signup;
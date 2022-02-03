// import React, {useEffect} from 'react';
// import {
//   Button, InputGroup, Form, Input

// } from 'reactstrap';

// import { request, gql } from 'graphql-request'
// import { useNavigate } from 'react-router-dom';


// const Login=() => {

//       const [email, setEmail] = React.useState('');
//       const [password, setPassword] = React.useState('');
//       const uri =process.env.REACT_APP_GRAPHQL_API;
//       const navigate = useNavigate();

//       function loginInput (e) {
//         if (e.target.name === 'email'){
//             setEmail(e.target.value)
          
//         } else if  (e.target.name === 'password'){
//             setPassword(e.target.value)    
//         }
//       }
//       const querySearch = gql`
//       query LoginAccount($email: String!, $password: String!){
//           accounts(where: { email: $email, password: $password }){
//             id
//             username
//           }
//         }
//       `


//       useEffect(()=> {
//         if (localStorage.getItem('userID') != null){
//             localStorage.removeItem('userID')
//             localStorage.removeItem('userName')
//             navigate(-1)
//           }
//       },);
      

//       function loginQuery(){
//         const fetchData = async () => {
//               const variables = {
//                 "email": email,
//                 "password": password,
//               }

//              await request(uri, querySearch, variables).then((data) => {
//                 if (data.accounts[0] != undefined){
//                 localStorage.setItem('userID', data.accounts[0].id);
//                 localStorage.setItem('userName', data.accounts[0].username)
//                 navigate(-1)

                
//                 } else {
//                     console.log('error')

//                 }
//              })          
//         }
//           fetchData().catch(console.error);;
//       }
//       return (
//         <div>

//             <Form>
//                 <InputGroup className='my-2 mt-3'>
//                     Username:<br/>
//                     <Input placeholder="Username"
//                         name='email' value={email}  onChange={loginInput}/>
//                     <br/>Password:<br/>
//                     <Input placeholder="Password"
//                         name='password' value={password} onChange={loginInput} />
                    
//                 </InputGroup>
//             </Form> 
//             <Button outline color="success" onClick={loginQuery}>Login</Button>{''}
//         </div>
//       );
//   }

//   export default Login;

import React, {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { AccountContext } from "./Account";
import {CircularProgress, Alert, AlertIcon, AlertTitle, AlertDescription,CloseButton, Box, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button} from '@chakra-ui/react';


const Login = (props) => {
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const {authenticate} = useContext(AccountContext);
    const loginerror = error.name === 'NotAuthorizedException' 
    const onSubmit = (event) => {
        
        event.preventDefault();
        setIsLoading(true)
        authenticate(username, password).then(data => {
          console.log("Logged In!", data);
          setIsLoading(false)
          navigate('/')
        }).catch((err)=> {
            setError(err)
            setIsLoading(false)
            console.log(error.name)
        //   console.log("Failed to login", err);
        })
    };
    const close = ()=> {
        setError({})
    };

    return (
        // <div>
        //     <form onSubmit={onSubmit}>
        //         <label>Username:</label>
        //         <input
        //         value={username}
        //         onChange={(event)=> setUsername(event.target.value)}
        //         ></input>
        //         <label>Password:</label>
        //         <input
        //         value={password}
        //         onChange={(event)=> setPassword(event.target.value)}
        //         type="password"
        //         ></input>

        //         <button type="submit">Login</button>
        //     </form>
        // </div>
                <Box>
                <form onSubmit={onSubmit}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input value={username} onChange={(event)=> setUsername(event.target.value)}  placeholder="example" />
                        <FormHelperText>
                        Enter your username
                        </FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                            
                        <FormLabel htmlFor="passowrd">Password</FormLabel>
                        <Input value={password} type="password" onChange={(event)=> setPassword(event.target.value)} placeholder="*************" />
                        <FormHelperText>
                        Enter your password
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
                                    'Sign In'
                                )
                                }
                            </Button>
                </form>
                {loginerror ?(
                                    <Alert status='error'>
                                    <AlertIcon />
                                    <AlertTitle mr={2}>There was a problem logging in!</AlertTitle>
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

export default Login;
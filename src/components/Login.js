import React, {useEffect} from 'react';
import {
  Button, InputGroup, Form, Input

} from 'reactstrap';

import { request, gql } from 'graphql-request'
import { useNavigate } from 'react-router-dom';


const Login=() => {

      const [email, setEmail] = React.useState('');
      const [password, setPassword] = React.useState('');
      const uri =process.env.REACT_APP_GRAPHQL_API;
      const navigate = useNavigate();

      function loginInput (e) {
        if (e.target.name === 'email'){
            setEmail(e.target.value)
          
        } else if  (e.target.name === 'password'){
            setPassword(e.target.value)    
        }
      }
      const querySearch = gql`
      query LoginAccount($email: String!, $password: String!){
          accounts(where: { email: $email, password: $password }){
            id
            username
          }
        }
      `


      useEffect(()=> {
        if (localStorage.getItem('userID') != null){
            localStorage.removeItem('userID')
            localStorage.removeItem('userName')
            navigate(-1)
          }
      },);
      

      function loginQuery(){
        const fetchData = async () => {
              const variables = {
                "email": email,
                "password": password,
              }

             await request(uri, querySearch, variables).then((data) => {
                if (data.accounts[0] != undefined){
                localStorage.setItem('userID', data.accounts[0].id);
                localStorage.setItem('userName', data.accounts[0].username)
                navigate(-1)

                
                } else {
                    console.log('error')

                }
             })          
        }
          fetchData().catch(console.error);;
      }
      return (
        <div>

            <Form>
                <InputGroup className='my-2 mt-3'>
                    Username:<br/>
                    <Input placeholder="Username"
                        name='email' value={email}  onChange={loginInput}/>
                    <br/>Password:<br/>
                    <Input placeholder="Password"
                        name='password' value={password} onChange={loginInput} />
                    
                </InputGroup>
            </Form> 
            <Button outline color="success" onClick={loginQuery}>Login</Button>{''}
        </div>
      );
  }

  export default Login;
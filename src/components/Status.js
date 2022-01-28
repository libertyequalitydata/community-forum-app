import React, {useState, useContext, useEffect } from "react";
import { AccountContext } from "./Account";
import { useNavigate } from 'react-router-dom';

const Status = () => {
    const [status, setStatus] = useState(false);
    const {getSession, logout, getUser} = useContext(AccountContext);
    let navigate = useNavigate();
    useEffect(()=>{
        getSession().then(session=>{
            console.log("Session ", session );
            setStatus(true);
        })
    }, [])

    function signup() {
        navigate('/signup')
      }
    function login() {
        navigate('/login')
      }
    return <div>{status ? <div>Currently Signed in as {getUser()}<br/><button onClick={logout}>Logout</button></div>: <div>Currently Signed in as Guest<br/><button onClick={signup}>Signup</button><button onClick={login}>Login</button></div>}</div>
    
}

export default Status;
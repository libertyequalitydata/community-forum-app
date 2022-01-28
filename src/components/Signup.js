import React, {useState} from "react";
import UserPool from "../UserPool";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const dataEmail = {
        Name: 'email',
        Value: email 
    }
    const navigate = useNavigate();
    const onSubmit = (event) => {
        event.preventDefault();
        
        UserPool.signUp(username, password, [dataEmail], null, (err,data) => {
            if (err) {
                console.log(err);
            } else {

                console.log(data);
                
                navigate(-1)
            }
            

        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
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
            </form>
        </div>

    );
};

export default Signup;
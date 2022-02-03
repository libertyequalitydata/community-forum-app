import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import MainPage from '../src/components/MainPage'
import QuestionPage from '../src/components/Question'
import Login from '../src/components/Login'
import Signup from "./components/Signup";
import { Account } from "./components/Account";


const StyledBox = styled.div`
  height: 100vh;

  padding: 50px;
  background-color: ${(props) =>
    props.colors ? props.colors.baseWhite : "#F5F8F7"};
`;


export const App = () => {
  return (
    <BrowserRouter >
    <StyledBox role={"remote"}>
    <Account>

          <Navbar/>
          <div className="content">
          <Routes>
            <Route path="/" element={<MainPage />}/> 
            <Route path="/signup" element={<Signup />}/> 
            <Route path="/login" element={<Login />}/> 
            <Route path="/question/:title/:questionid" element={<QuestionPage />}/>     
          </Routes>
          </div>
    </Account>
    </StyledBox>
    </BrowserRouter>
  );
};

export default App
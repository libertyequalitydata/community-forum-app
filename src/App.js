import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import MainPage from '../src/components/MainPage'
import QuestionPage from '../src/components/Question'

const StyledBox = styled.div`
  height: 100vh;

  padding: 50px;
  background-color: ${(props) =>
    props.colors ? props.colors.baseWhite : "#F5F8F7"};
`;


export const App = () => {

  return (
    <BrowserRouter>
    <StyledBox role={"remote"}>
          <Navbar />
          <div className="content">
          <Routes>
            <Route path="/" element={<MainPage />}/> 
            <Route path="/question/:title/:questionid" element={<QuestionPage />}/>     
          </Routes>
          </div>

    </StyledBox>
    </BrowserRouter>
  );
};

export default App
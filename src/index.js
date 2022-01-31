/**
 * Entrypoint of the Remote Component.
 */
import App  from "./App";
import ReactDOM from "react-dom";
import React from "react";
import reportWebVitals from "./reportWebVitals";
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'


ReactDOM.render(
    <React.StrictMode>
      <ChakraProvider>

        <App />
      </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
  
  reportWebVitals();

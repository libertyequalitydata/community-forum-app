/**
 * Entrypoint of the Remote Component.
 */
import App  from "./App";
import ReactDOM from "react-dom";
import React from "react";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
  
  reportWebVitals();

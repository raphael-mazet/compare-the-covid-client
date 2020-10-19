import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./components/Router";
import dotenv from 'dotenv'


function App(): JSX.Element {
  dotenv.config()
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;

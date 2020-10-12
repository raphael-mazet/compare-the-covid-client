import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './components/Router';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
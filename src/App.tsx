import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import TestContainer from './containers/TestContainer/TestContainer'

function App(): JSX.Element {

  const isLoggedIn = true;

  return (
    <>
      <TestContainer/>
    </>
    
  );
}

export default App;
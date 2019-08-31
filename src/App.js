import React from 'react';
import {Switch, Route} from 'react-router-dom'
import ReactTab from './React/ReactTab.js'
import './App.css';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path='/' component={ReactTab}/>
    </Switch>
    </div>
  );
}

export default App;

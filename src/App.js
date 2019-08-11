import React from 'react';
import Home from './Home/Home.js'
import {Switch, Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path='/' component={Home}/>
    </Switch>   
    </div>
  );
}

export default App;

import React from 'react';
import Navbar from './Navbar/Navbar.js'
import Home from './Home/Home.js'
import {Switch, Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
    <Switch>
      <Navbar/>
      <Route exact path='/' component={Home}/>
    </Switch>   
    </div>
  );
}

export default App;

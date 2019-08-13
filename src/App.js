import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './Home/Home.js'
import VanillaJS from './VanillaJS/VanillaJS.js'
import ReactTab from './React/ReactTab.js'
import './App.css';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/vanillajs' component={VanillaJS}/>
      <Route path='/react' component={ReactTab}/>
    </Switch>   
    </div>
  );
}

export default App;

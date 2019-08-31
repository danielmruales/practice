import React from 'react';
import {Switch, Route} from 'react-router-dom'
import FormWidget from './React/FormWidget.js'
import './App.css';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path='/' component={FormWidget}/>
    </Switch>
    </div>
  );
}

export default App;

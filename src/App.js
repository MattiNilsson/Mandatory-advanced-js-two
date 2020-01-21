import React from 'react';
import Main from "./components/Main";
import Add from "./components/Add";
import Details from "./components/Details";
import Edit from "./components/Edit";
import './App.css';
import {Helmet} from "react-helmet";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {


  render(){
    return (
      <div className="App">
        <div>
          <Router>
            <div className="header">
              <Link to="/"><button className="btn">Home</button></Link>
              <Link to="/Add"><button className="btn">Add</button></Link>
            </div>
            <Route exact path="/" component={Main}/>
            <Route path="/Add" component={Add}/>
            <Route path="/Details/:id" component={Details}/>
            <Route path="/Edit/:id" component={Edit}/>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;

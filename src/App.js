import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Scoreboard from "./Scoreboard";
import Admin from "./Admin";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Scoreboard />} />
          <Route path="/admin" exact component={() => <Admin />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
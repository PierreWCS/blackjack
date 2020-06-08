import React from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameScreen from "./components/Game/GameScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/game" component={GameScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

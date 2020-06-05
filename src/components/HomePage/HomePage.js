import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homePageContainer">
      <div className="contentContainerHomePage">
        <h1 className="titleHomePage">Play Blackjack against the Bank !</h1>
        <Link to="/game">Start a game</Link>
        <Link to="/random">Get a random card</Link>
      </div>
    </div>
  );
};

export default HomePage;

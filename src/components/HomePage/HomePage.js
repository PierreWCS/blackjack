import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homePageContainer">
      <div className="contentContainerHomePage">
        <h1 className="titleHomePage">Play Blackjack against the Bank !</h1>
        <Link className="startGameHomePage" to="/game">
          PLAY
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

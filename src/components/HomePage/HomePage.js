import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import PopUp from "../PopUp/PopUp";

const HomePage = () => {
  const [playerCoins, setPlayerCoins] = useState(null);
  const [displayPopup, setDisplayPopUp] = useState(false);
  useEffect(() => {
    getPlayerCoins();
  }, []);

  const getPlayerCoins = function () {
    let stockPlayerCoins = JSON.parse(localStorage.getItem("playerCoins"));
    if (!stockPlayerCoins) {
      setDisplayPopUp(true);
      let playerCoinsInit = 100;
      localStorage.setItem("playerCoins", JSON.stringify(playerCoinsInit));
      setPlayerCoins(playerCoinsInit);
    } else {
      setPlayerCoins(stockPlayerCoins);
    }
  };

  return (
    <div className="homePageContainer">
      <TopBar playerCoins={playerCoins} />
      <div className="contentContainerHomePage">
        <h1 className="titleHomePage">Play Blackjack against the Bank !</h1>
        <Link className="startGameHomePage" to="/game">
          PLAY
        </Link>
      </div>
      {displayPopup ? (
        <PopUp setDisplayPopUp={setDisplayPopUp} type="gift" />
      ) : null}
    </div>
  );
};

export default HomePage;

import React from "react";
import "./TopBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCoins } from "@fortawesome/free-solid-svg-icons";

const TopBar = ({ playerCoins }) => {
  return (
    <div className="topBarContainer">
      <Link className="linkToHome" to="/">
        <FontAwesomeIcon icon={faHome} color="indianred" />
        Home
      </Link>
      <div className="coinsContainer">
        <FontAwesomeIcon icon={faCoins} color="gold" />
        <p className="playerCoins">Coins: {playerCoins ? playerCoins : null}</p>
      </div>
    </div>
  );
};

export default TopBar;

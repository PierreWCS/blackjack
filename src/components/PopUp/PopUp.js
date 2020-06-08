import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./PopUp.css";

const PopUp = ({ type, bankScore, reward, setDisplayPopUp, defeatType }) => {
  if (type === "win") {
    return (
      <div className="popUpContainer">
        <FontAwesomeIcon icon={faTrophy} className="fa-6x" color="gold" />
        <p className="popUpTypeMessage">Victory !</p>
        <p>Bank has {bankScore}</p>
        <p>You won {reward} credits !</p>
        <button
          className="closePopUpButton"
          onClick={() => setDisplayPopUp(false)}
        >
          Close
        </button>
      </div>
    );
  } else if (defeatType === "busted") {
    return (
      <div className="popUpContainer">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="fa-6x"
          color="indianred"
        />
        <p className="popUpTypeMessage">Busted !</p>
        <p>You are over 21</p>
        <button
          className="closePopUpButton"
          onClick={() => setDisplayPopUp(false)}
        >
          Close
        </button>
      </div>
    );
  } else if (type === "loose") {
    return (
      <div className="popUpContainer">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="fa-6x"
          color="indianred"
        />
        <p className="popUpTypeMessage">Defeat !</p>
        <p>Bank has {bankScore}</p>
        <button
          className="closePopUpButton"
          onClick={() => setDisplayPopUp(false)}
        >
          Close
        </button>
      </div>
    );
  }
};

export default PopUp;

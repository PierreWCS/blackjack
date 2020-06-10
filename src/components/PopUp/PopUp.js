import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faTimesCircle,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
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
  } else if (defeatType === "bankHigher") {
    return (
      <div className="popUpContainer">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="fa-6x"
          color="indianred"
        />
        <p className="popUpTypeMessage">Loose !</p>
        <p>Bank is higher with {bankScore}</p>
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
  } else if (type === "gift") {
    return (
      <div className="popUpContainer">
        <FontAwesomeIcon icon={faGift} className="fa-6x" color="gold" />
        <p className="popUpTypeMessage">Welcome !</p>
        <p>As a welcome gift, we gave you 100 coins</p>
        <p>Have fun with this blackjack game !</p>
        <button
          className="closePopUpButton"
          onClick={() => setDisplayPopUp(false)}
        >
          Thanks !
        </button>
      </div>
    );
  }
};

export default PopUp;

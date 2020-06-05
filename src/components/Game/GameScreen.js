import React, { useEffect, useState } from "react";
import CardsDeck from "../../services/CardsDeck";
import "./GameScreen.css";

const GameScreen = () => {
  const [gameDeck, setGameDeck] = useState(null);
  const [bankCards, setBankCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerDeckValue, setPlayerDeckValue] = useState(0);
  const [gameScore, setGameScore] = useState(null);

  useEffect(() => {
    // Create deck
    let deck = CardsDeck.getDeck();
    setGameDeck(deck);
    console.log("Random deck :", deck);
  }, []);

  const getCards = function () {
    let initPlayerDeck = [];

    // Pick card 1
    let firstPick = CardsDeck.getCardFromDeck(gameDeck);
    initPlayerDeck.push(firstPick.card);
    setPlayerCards(initPlayerDeck);
    setGameDeck(firstPick.deck);

    // Then pick card 2
    let secondPick = CardsDeck.getCardFromDeck(gameDeck);
    initPlayerDeck.push(secondPick.card);
    setGameDeck(secondPick.deck);

    // Set the player deck with the picked cards
    setPlayerCards(initPlayerDeck);

    // Set the value of the deck
    let deckValue = initPlayerDeck[0].power + initPlayerDeck[1].power;
    setPlayerDeckValue(deckValue);

    // Set the bank cards
    let bankInit = [];

    // First card of the bank
    let bankFirstPick = CardsDeck.getCardFromDeck(gameDeck);
    setGameDeck(bankFirstPick.deck);
    bankInit.push(bankFirstPick.card);

    // Second card of the bank
    let bankSecondPick = CardsDeck.getCardFromDeck(gameDeck);
    setGameDeck(bankSecondPick.deck);
    bankInit.push(bankSecondPick.card);

    setBankCards(bankInit);
  };

  const givePlayerNewCard = function async() {
    console.log("I want another card");
    let pickFromDeck = CardsDeck.getCardFromDeck(gameDeck);

    let stockPlayerCards = playerCards;
    stockPlayerCards.push(pickFromDeck.card);
    setGameDeck(pickFromDeck.deck);
    setPlayerCards([...stockPlayerCards]);

    // Verifying the power of the deck
    let countPower = playerDeckValue + pickFromDeck.card.power;
    console.log(countPower);

    if (countPower > 21) {
      setPlayerDeckValue(countPower);
      setGameScore("loose");
      alert("BUSTED");
    } else if (countPower === 21) {
      alert("You reached 21 !");
    } else {
      setPlayerDeckValue(countPower);
    }
  };

  return (
    <div className="gameScreenContainer">
      <div className="gameArea">
        {bankCards.length ? (
          <div className="bankCardsContainer">
            {bankCards.map((card, key) => {
              if (key === 0) {
                return (
                  <img
                    key={key}
                    className="playerCardImage"
                    src={require(`../../datas/cards/cards-images/${card.img}`)}
                    alt="player card"
                  />
                );
              } else
                return (
                  <img
                    key={key}
                    className="playerCardImage"
                    src={require("../../datas/cards/cards-images/backs-card/red_back.png")}
                    alt=""
                  />
                );
            })}
          </div>
        ) : null}

        {playerCards.length ? null : (
          <button className="startGameButton" onClick={getCards}>
            Start the game
          </button>
        )}

        {/*    Player cards container     */}
        {playerCards.length ? (
          <div className="playerCardsContainer">
            <p className="myCardTitle">My cards</p>
            <div className="buttonsAndValueContainer">
              {playerDeckValue ? (
                <p className="deckValue">
                  Total value:{" "}
                  <span className="deckValueSpan">{playerDeckValue}</span>
                </p>
              ) : null}
              {!gameScore ? (
                <div className="buttonsContainer">
                  <button className="newCardButton" onClick={givePlayerNewCard}>
                    New card
                  </button>
                  <button className="stopButton">Stop</button>
                </div>
              ) : (
                <button className="newGameButton">New game</button>
              )}
            </div>
            {/*     Cards      */}
            <div className="cardContainer">
              {playerCards.map((card, key) => {
                return (
                  <img
                    key={key}
                    className="playerCardImage"
                    src={require(`../../datas/cards/cards-images/${card.img}`)}
                    alt="player card"
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GameScreen;

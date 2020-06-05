import React, { useEffect, useState } from "react";
import CardsDeck from "../../services/CardsDeck";
import "./GameScreen.css";

const GameScreen = () => {
  const [gameDeck, setGameDeck] = useState(null);
  const [bankCards, setBankCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);

  useEffect(() => {
    // Create deck
    let deck = CardsDeck.getDeck();
    setGameDeck(deck);
    console.log("Random deck :", deck);
  }, []);

  const givePlayerCards = function async() {
    // If the player has no cards
    if (playerCards.length < 2) {
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

      //  Set the player deck with the picked cards
      setPlayerCards(initPlayerDeck);

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
    }

    // If the player wants a third card
    else if (playerCards.length < 3) {
      console.log("coucou je veux une 3e carte");
      let thirdPick = CardsDeck.getCardFromDeck(gameDeck);
      let stockPlayerCards = playerCards;
      stockPlayerCards.push(thirdPick.card);
      setGameDeck(thirdPick.deck);

      // Set the player deck with the third pick
      setPlayerCards([...stockPlayerCards]);
      console.log(playerCards);
      console.log(gameDeck);
    }

    //  If the player wants a fourth card
    else if (playerCards.length < 4) {
      console.log("coucou je veux une 4e carte");
      let fourthPick = CardsDeck.getCardFromDeck(gameDeck);
      let stockPlayerCards = playerCards;
      stockPlayerCards.push(fourthPick.card);
      setGameDeck(fourthPick.deck);

      // Set the player deck with the third pick
      setPlayerCards([...stockPlayerCards]);
      console.log(gameDeck);
      console.log(playerCards);
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
        <button className="giveCardsButton" onClick={givePlayerCards}>
          {playerCards.length < 2 ? "Get cards" : "New card"}
        </button>

        {/*    Player cards container     */}
        <div className="playerCardsContainer">
          <p>My cards</p>
          {/*     Cards      */}
          {playerCards.length > 0 ? (
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
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;

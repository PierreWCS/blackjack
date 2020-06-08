import React, { useEffect, useState } from "react";
import CardsDeck from "../../services/CardsDeck";
import "./GameScreen.css";

const GameScreen = () => {
  const [gameDeck, setGameDeck] = useState(null);
  const [bankCards, setBankCards] = useState([]);
  const [bankDeckValue, setBankDeckValue] = useState(0);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerDeckValue, setPlayerDeckValue] = useState(0);
  const [playerIsDone, setPlayerIsDone] = useState(false);
  const [showBankCard, setShowBankCard] = useState(false);

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
    setBankDeckValue(bankFirstPick.card.power + bankSecondPick.card.power);
  };

  const givePlayerNewCard = function () {
    let pickFromDeck = CardsDeck.getCardFromDeck(gameDeck);

    let stockPlayerCards = playerCards;
    stockPlayerCards.push(pickFromDeck.card);
    setGameDeck(pickFromDeck.deck);
    setPlayerCards([...stockPlayerCards]);

    // Verifying the power of the deck
    let countPower = playerDeckValue + pickFromDeck.card.power;

    if (countPower > 21) {
      setPlayerDeckValue(countPower);
      setGameScore("loose");
      alert("BUSTED");
    } else if (countPower === 21) {
      alert("You reached 21 !");
      setPlayerDeckValue(countPower);
    } else {
      setPlayerDeckValue(countPower);
    }
  };

  const bankPlays = function (value) {
    setPlayerIsDone(true);
    setShowBankCard(true);

    setTimeout(() => {
      let stockValue = bankDeckValue;
      if (stockValue === 21) {
        setGameScore("loose");
        alert("Bank has 21. You loose");
        return 0;
      }

      if (value && value > 0) {
        let bankPick = CardsDeck.getCardFromDeck(gameDeck);
        let deckValue = value + bankPick.card.power;
        setGameDeck([...bankPick.deck]);
        let stockCards = bankCards;
        stockCards.push(bankPick.card);
        setBankCards([...stockCards]);
        setBankDeckValue(deckValue);
        setTimeout(() => {
          if (deckValue < 17) {
            bankPlays(deckValue);
          } else {
            if (deckValue >= playerDeckValue) {
              setGameScore("loose");
              alert(`Bank has ${deckValue}, you loose`);
              return 0;
            } else {
              setGameScore("win");
              setGameScore(`Bank has ${deckValue}, you win`);
              return 0;
            }
          }
        }, 2000);
      }

      // If the bank needs to pick a new card
      else if (stockValue < 17) {
        let bankPick = CardsDeck.getCardFromDeck(gameDeck);
        let deckValue = bankDeckValue + bankPick.card.power;
        setBankDeckValue(deckValue);
        setGameDeck([...bankPick.deck]);
        let stockCards = bankCards;
        stockCards.push(bankPick.card);
        setBankCards([...stockCards]);

        setTimeout(() => {
          // If the bank value is higher than 17 BREAK
          if (deckValue >= 17 && deckValue <= 21) {
            setBankDeckValue(deckValue);
            if (deckValue >= playerDeckValue) {
              setGameScore("loose");
              alert(`Bank has ${deckValue}, you loose`);
            } else {
              setGameScore("win");
              alert(`Bank has ${deckValue}, you win`);
            }
          } else if (deckValue > 21) {
            setGameScore("win");
            alert(`Bank has busted with ${deckValue}, you win`);
          } else if (deckValue < 17) {
            bankPlays(deckValue);
          }
        }, 2000);
      }
      // If the bank is lower than player
      else if (stockValue < playerDeckValue) {
        setGameScore("win");
        alert(`Bank has ${stockValue}, you win`);
      }
      // If the bank is higher than player
      else if (stockValue >= playerDeckValue && stockValue <= 21) {
        setGameScore("loose");
        alert(`Bank has ${stockValue}! You loose`);
      }
    }, 2000);
  };

  const resetGame = function () {
    setShowBankCard(false);
    setPlayerCards([]);
    setPlayerDeckValue(null);
    setBankCards([]);
    let stockNewDeck = CardsDeck.getDeck();
    setGameDeck(stockNewDeck);
    setGameScore(null);
    setPlayerIsDone(false);
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
                    className="bankCard"
                    src={require(`../../datas/cards/cards-images/${card.img}`)}
                    alt="bank card"
                  />
                );
              } else if (key === 1) {
                return (
                  <div className="hiddenCard" key={key}>
                    <img
                      src={require("../../datas/cards/cards-images/backs-card/red_back.png")}
                      className="bankCard face front"
                      alt="bank hidden card"
                    />
                    <img
                      src={require(`../../datas/cards/cards-images/${card.img}`)}
                      className={`bankCard face back ${
                        showBankCard ? "showHiddenCard" : null
                      }`}
                      alt="bank card"
                    />
                  </div>
                );
              } else if (key === 2) {
                return (
                  <img
                    key={key}
                    className="bankCard"
                    style={{ marginLeft: "165px" }}
                    src={require(`../../datas/cards/cards-images/${card.img}`)}
                    alt="bank card"
                  />
                );
              } else {
                return (
                  <img
                    key={key}
                    className="bankCard"
                    src={require(`../../datas/cards/cards-images/${card.img}`)}
                    alt="bank card"
                  />
                );
              }
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

              {/*     Game actions     */}
              {!gameScore && playerDeckValue <= 21 && !playerIsDone ? (
                <div className="buttonsContainer">
                  <button className="newCardButton" onClick={givePlayerNewCard}>
                    New card
                  </button>
                  <button className="stopButton" onClick={bankPlays}>
                    Stop
                  </button>
                </div>
              ) : (
                <button className="newGameButton" onClick={resetGame}>
                  New game
                </button>
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

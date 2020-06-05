import React, { useEffect, useState } from "react";
import cards from "../datas/cards";
import "./RandomCard.css";
import RandomNumber from "../services/RandomNumber";

const RandomCard = () => {
  const [randomCard, setRandomCard] = useState(null);
  const [cardDeck, setCardDeck] = useState(null);
  useEffect(() => {
    createCardDeck();
  }, []);

  const createCardDeck = () => {
    const stockCard = cards;
    stockCard.sort(() => Math.random() - 0.5);
    console.log(stockCard);
    setCardDeck([...stockCard]);
  };

  console.log(cards);
  return (
    <div>
      <h1>Get a random card</h1>
      <button onClick={() => setRandomCard(cards[RandomNumber(0, 51)])}>
        Card
      </button>
      {randomCard ? (
        <div>
          <h3>{randomCard.name}</h3>
          <img
            className="randomCardImage"
            src={require(`../datas/cards-images/${randomCard.img}`)}
            alt="card"
          />
        </div>
      ) : null}
      {cardDeck ? (
        <div className="deckContainer">
          {cardDeck.map(element => {
            return (
              <div>
                <img
                  className="randomDeckCardImage"
                  src={require(`../datas/cards-images/${element.img}`)}
                  alt="card"
                />
              </div>
            );
          })}
          <p>{cardDeck.length}</p>
        </div>
      ) : null}
      <button onClick={createCardDeck}>Squeeze</button>
    </div>
  );
};

export default RandomCard;

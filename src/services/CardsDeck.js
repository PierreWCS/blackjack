import Cards from "../datas/cards/cards.json";
import randomNumber from "./RandomNumber";

export default {
  getDeck() {
    let stockCards = Cards;
    return stockCards.sort(() => Math.random() - 0.5);
  },

  shuffleDeck(arr) {
    return arr
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  },

  getCardFromDeck(deck) {
    let cardTook = deck.splice(randomNumber(0, deck.length), 1);
    deck.map(function (card, key) {
      if (card.name === cardTook.name) return deck.splice(key, 1);
      else return 0;
    });
    return { deck: deck, card: cardTook[0] };
  },
};

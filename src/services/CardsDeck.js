import Cards from "../datas/cards/cards.json";
import randomNumber from "./RandomNumber";

export default {
  getDeck() {
    return Cards.sort(() => Math.random() - 0.5);
  },

  squeezeDeck(deck) {
    return deck.sort(() => Math.random() - 0.5);
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

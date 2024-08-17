// utils/determinePlayableCards.js
const cardOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const determinePlayableCards = (hand, pile) => {
  if (!hand || hand.length === 0) {
    return [];
  }

  return hand.map(card =>
    pile.length === 0 ||
    cardOrder.indexOf(card.value) >= cardOrder.indexOf(pile[pile.length - 1]?.value)
  );
};
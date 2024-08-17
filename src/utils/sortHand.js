// utils/sortHand.js
const cardOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const sortHand = (hand) => {
  return hand.sort((a, b) => cardOrder.indexOf(a.value) - cardOrder.indexOf(b.value));
};
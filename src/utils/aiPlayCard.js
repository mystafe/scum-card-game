// utils/aiPlayCard.js
const cardOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const aiPlayCard = (currentHand, pile, playCard, nextTurn) => {
  const playableCards = currentHand.filter(card =>
    pile.length === 0 ||
    cardOrder.indexOf(card.value) >= cardOrder.indexOf(pile[pile.length - 1]?.value)
  );

  if (playableCards.length > 0) {
    const playedCard = playableCards[0];
    playCard(currentHand.indexOf(playedCard));
  } else {
    nextTurn();
  }
};
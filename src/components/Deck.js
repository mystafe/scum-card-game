class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  toString() {
    return `${this.value} of ${this.suit}`;
  }
}

class Deck {
  constructor() {
    this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.cards = [];

    this.suits.forEach(suit => {
      this.values.forEach(value => {
        this.cards.push(new Card(suit, value));
      });
    });

    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal(numPlayers) {
    const cardsPerPlayer = Math.floor(this.cards.length / numPlayers);
    const hands = [];

    for (let i = 0; i < numPlayers; i++) {
      hands.push(this.cards.slice(i * cardsPerPlayer, (i + 1) * cardsPerPlayer));
    }

    return hands;
  }
}

export default Deck;
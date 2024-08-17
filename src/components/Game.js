import React, { useState, useEffect } from 'react';
import Deck from './Deck';
import Player from './Player';
import { sortHand } from '../utils/sortHand';
import { determinePlayableCards } from '../utils/determinePlayableCards';
import { aiPlayCard, aiStrategy } from '../utils/aiPlayCard';

const cardOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function Game() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [deck, setDeck] = useState(new Deck());
  const [pile, setPile] = useState([]);
  const [round, setRound] = useState(1);
  const [playableCards, setPlayableCards] = useState([]);
  const [passCount, setPassCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [totalScores, setTotalScores] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (players.length > 0 && currentPlayer !== 0) {
      const aiMove = aiStrategy(players[currentPlayer], pile);
      if (aiMove) {
        playCard(players[currentPlayer].indexOf(aiMove));
      } else {
        passTurn();
      }
    } else if (players.length > 0 && currentPlayer === 0) {
      setPlayableCards(determinePlayableCards(players[currentPlayer], pile));
    }
  }, [currentPlayer]);

  useEffect(() => {
    const remainingPlayers = players.filter(hand => hand.length > 0);
    if (remainingPlayers.length === 1) {
      setGameOver(true);
    }
  }, [players]);

  const startGame = () => {
    const numPlayers = 4;
    const hands = deck.deal(numPlayers);  // Artık deal metodunu kullanıyoruz
    setPlayers(hands);
    setPile([]);
    setCurrentPlayer(0);
    setRound(1);
    setPassCount(0);
    setGameOver(false);
    setTotalScores([0, 0, 0, 0, 0, 0]);
    setPlayableCards(determinePlayableCards(hands[0], []));
  };

  const playCard = (cardIndex) => {
    const currentHand = players[currentPlayer];
    const playedCard = currentHand[cardIndex];

    if (pile.length === 0 ||
      cardOrder.indexOf(playedCard.value) >= cardOrder.indexOf(pile[pile.length - 1]?.value)) {
      setPile([...pile, playedCard]);
      const newHand = currentHand.filter((_, i) => i !== cardIndex);
      const newPlayers = [...players];
      newPlayers[currentPlayer] = newHand;
      setPlayers(newPlayers);
      setPassCount(0);

      if (newHand.length === 0) {
        const rankings = updateRankings(players);
        const roundScores = calculateScores(rankings);
        setTotalScores(updateTotalScores(totalScores, roundScores));
        nextRound();
      } else {
        nextTurn();
      }
    } else {
      alert('You cannot play this card.');
    }
  };

  const passTurn = () => {
    const newPassCount = passCount + 1;
    setPassCount(newPassCount);

    if (newPassCount >= players.length - 1) {
      alert('All players passed. Starting a new round.');
      nextRound();
    } else {
      nextTurn();
    }
  };

  const nextTurn = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  const nextRound = () => {
    const rankings = updateRankings(players);
    swapCards(players, rankings);
    setRound(round + 1);
    setPile([]);
    setCurrentPlayer(0);
    setPassCount(0);
    setPlayableCards(determinePlayableCards(players[0], []));
  };

  const updateRankings = (players) => {
    const rankings = players.map((hand, index) => {
      if (hand.length === 0) return 'President';
      if (hand.length === players[players.length - 1].length) return 'Scum';
      return `Player ${index + 1}`;
    });

    return rankings;
  };

  const swapCards = (players, rankings) => {
    const presidentIndex = rankings.indexOf('President');
    const scumIndex = rankings.indexOf('Scum');

    if (presidentIndex === -1 || scumIndex === -1) {
      // President veya Scum bulunamadıysa, işlemi atla
      return;
    }

    let presidentHand = players[presidentIndex];
    let scumHand = players[scumIndex];

    const scumBestCards = scumHand.splice(scumHand.length - 2, 2);
    const presidentWorstCards = presidentHand.splice(0, 2);

    scumHand.push(...presidentWorstCards);
    presidentHand.push(...scumBestCards);

    players[presidentIndex] = sortHand(presidentHand);
    players[scumIndex] = sortHand(scumHand);
  };

  const calculateScores = (rankings) => {
    const scores = rankings.map(rank => {
      switch (rank) {
        case 'President': return 3;
        case 'Vice President': return 2;
        case 'Scum': return 0;
        default: return 1;
      }
    });

    return scores;
  };

  const updateTotalScores = (totalScores, roundScores) => {
    return totalScores.map((score, index) => score + roundScores[index]);
  };

  return (
    <div>
      <h1>Scum Card Game</h1>
      {!gameOver ? (
        <>
          <button onClick={startGame}>Start Game</button> {/* Start Game butonu */}
          <div>
            {players.map((hand, index) => (
              <Player
                key={index}
                hand={hand}
                isCurrent={index === currentPlayer}
                playCard={playCard}
                playableCards={index === currentPlayer ? playableCards : []}
                passTurn={passTurn}
              />
            ))}
          </div>
          <div>
            <h2>Game Pile:</h2>
            <div>{pile.map((card, index) => <div key={index}>{card.toString()}</div>)}</div>
          </div>
          <button onClick={passTurn}>Pass Turn</button>
        </>
      ) : (
        <div>
          <h2>Game Over!</h2>
          <p>The last player standing has won the game.</p>
          <button onClick={startGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
}

export default Game;
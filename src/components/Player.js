import React from 'react';
import Card from './Card';

function Player({ hand, isCurrent, playCard, passTurn, playableCards }) {
  return (
    <div style={{ border: isCurrent ? '2px solid red' : '1px solid black' }}>
      {hand.map((card, index) => (
        <Card
          key={index}
          card={card}
          isPlayable={playableCards[index]}
          playCard={() => isCurrent && playableCards[index] && playCard(index)}
        />
      ))}
      {isCurrent && (
        <button onClick={passTurn}>Pas Geç</button>  // Oyuncu pas geçebilir
      )}
    </div>
  );
}

export default Player;
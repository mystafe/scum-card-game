import React from 'react';

function Card({ card, isPlayable, playCard }) {
  const cardStyle = {
    color: isPlayable ? 'green' : 'black',  // Oynanabilir kartları yeşil renkte göster
    cursor: isPlayable ? 'pointer' : 'default',
    margin: '5px',
    padding: '10px',
    border: '1px solid black',
    display: 'inline-block'
  };

  return (
    <div style={cardStyle} onClick={playCard}>
      {card.toString()}
    </div>
  );
}

export default Card;
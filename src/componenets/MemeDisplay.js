import React from 'react';

export default function MemeDisplay({ imageUrl, topText, bottomText }) {
  return (
    <div className="meme-container">
      <div className="meme">
        <img src={imageUrl} className="meme--image" alt="Meme" />
        <h2 className="meme--text top">{topText}</h2>
        <h2 className="meme--text bottom">{bottomText}</h2>
      </div>
    </div>
  );
}
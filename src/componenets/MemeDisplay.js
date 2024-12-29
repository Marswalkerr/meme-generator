import React from 'react';

export default function MemeDisplay({ imageUrl, topText, bottomText, onNewImage }) {
  return (
    <div className="meme-container">
      <div className="meme">
        <img src={imageUrl} className="meme--image" alt="Meme" />
        <h2 className="meme--text top">{topText}</h2>
        <h2 className="meme--text bottom">{bottomText}</h2>
      </div>
      <button className="form--button newMemeBtn" onClick={onNewImage}>
        Get a random meme image ➔
      </button>
    </div>
  );
}
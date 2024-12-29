import React from 'react';

export default function MemeForm({ meme, onTextChange, onNewImage, onGenerate }) {
  return (
    <div className="form">
      <div className="inputText">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={onTextChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={onTextChange}
        />
      </div>
      <button className="form--button" onClick={onNewImage}>
        Get a new meme image 🖼
      </button>
      <button className="form--button generateBtn" onClick={onGenerate}>
        Generate Meme
      </button>
    </div>
  );
}
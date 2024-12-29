// MemeDisplay.js
import React from 'react';

export default function MemeDisplay({ imageUrl, topText, bottomText, textSettings, onNewImage }) {
  const getTextStyle = (position) => {
    const baseStyle = {
      fontFamily: textSettings.font,
      fontSize: `${textSettings.fontSize}px`,
      fontWeight: textSettings.isBold ? 'bold' : 'normal',
      fontStyle: textSettings.isItalic ? 'italic' : 'normal',
      textAlign: textSettings.textAlign,
      opacity: textSettings.opacity,
      textTransform: textSettings.isAllCaps ? 'uppercase' : 'none'
    };

    // Add text effects based on textStyle
    if (textSettings.textStyle === 'shadow') {
      baseStyle.textShadow = `
        -${textSettings.outlineWidth}px -${textSettings.outlineWidth}px 0 #000,
        ${textSettings.outlineWidth}px -${textSettings.outlineWidth}px 0 #000,
        -${textSettings.outlineWidth}px ${textSettings.outlineWidth}px 0 #000,
        ${textSettings.outlineWidth}px ${textSettings.outlineWidth}px 0 #000
      `;
    } else if (textSettings.textStyle === 'outline') {
      baseStyle.WebkitTextStroke = `${textSettings.outlineWidth}px black`;
    }

    return {
      ...baseStyle,
      position: 'absolute',
      width: '80%',
      left: '50%',
      transform: 'translateX(-50%)',
      margin: '15px 0',
      padding: '0 5px',
      color: 'white',
      ...(position === 'top' ? { top: 0 } : { bottom: 0 })
    };
  };

  return (
    <div className="meme-container">
      <div className="meme">
        <img src={imageUrl} className="meme--image" alt="Meme" />
        <h2 style={getTextStyle('top')}>{topText}</h2>
        <h2 style={getTextStyle('bottom')}>{bottomText}</h2>
      </div>
      <button className="form--button newMemeBtn" onClick={onNewImage}>
        Get a random meme image ➔
      </button>
    </div>
  );
}
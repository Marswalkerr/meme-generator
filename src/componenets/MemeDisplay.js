import React from 'react';

export default function MemeDisplay({ imageUrl, topText, bottomText, textSettings, onNewImage }) {
  const getTextStyle = (position) => {
    // Match canvas shadow/outline scaling
    const outlineScale = Math.max(textSettings.fontSize / 32, 1);
    const scaledOutlineWidth = Math.ceil(textSettings.outlineWidth * outlineScale);
    
    const baseStyle = {
      position: 'absolute',
      width: '80%',
      left: '50%',
      transform: 'translateX(-50%)',
      margin: '15px 0',
      padding: '0 5px',
      color: 'white',
      fontFamily: textSettings.font,
      fontSize: `${textSettings.fontSize}px`,
      fontStyle: textSettings.isItalic ? 'italic' : 'normal',
      textAlign: textSettings.textAlign,
      opacity: textSettings.opacity,
      textTransform: textSettings.isAllCaps ? 'uppercase' : 'none',
      fontWeight: textSettings.isBold ? '700' : '400',
      ...(position === 'top' ? { top: 0 } : { bottom: 0 })
    };

    if (textSettings.textStyle === 'shadow') {
      const shadowBlur = 4;
      const shadowColor = 'rgba(0, 0, 0, 0.7)';
      const shadowSize = Math.max(2, scaledOutlineWidth);
      
      baseStyle.textShadow = `
        ${shadowSize}px ${shadowSize}px ${shadowBlur}px ${shadowColor},
        ${-shadowSize}px ${shadowSize}px ${shadowBlur}px ${shadowColor},
        ${shadowSize}px ${-shadowSize}px ${shadowBlur}px ${shadowColor},
        ${-shadowSize}px ${-shadowSize}px ${shadowBlur}px ${shadowColor}
      `;
    } else if (textSettings.textStyle === 'outline') {
      const outlineShadows = [];
      
      for (let x = -scaledOutlineWidth; x <= scaledOutlineWidth; x++) {
        for (let y = -scaledOutlineWidth; y <= scaledOutlineWidth; y++) {
          if (x === 0 && y === 0) continue;
          if (Math.abs(x) === scaledOutlineWidth || Math.abs(y) === scaledOutlineWidth) {
            outlineShadows.push(`${x}px ${y}px 0 #000`);
          }
        }
      }
      
      baseStyle.textShadow = outlineShadows.join(', ');
    }

    return baseStyle;
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
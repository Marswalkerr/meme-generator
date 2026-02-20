import React from 'react';

export default function MemeDisplay({ imageUrl, topText, bottomText, textSettings }) {
  const getTextStyle = (position) => {
    const outlineScale = Math.max(textSettings.fontSize / 32, 1);
    const scaledWidth = Math.ceil(textSettings.outlineWidth * outlineScale);

    const base = {
      position: 'absolute',
      width: '90%',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '0 8px',
      color: 'white',
      fontFamily: textSettings.font,
      fontSize: `${textSettings.fontSize}px`,
      fontStyle: textSettings.isItalic ? 'italic' : 'normal',
      textAlign: textSettings.textAlign,
      opacity: textSettings.opacity,
      textTransform: textSettings.isAllCaps ? 'uppercase' : 'none',
      fontWeight: textSettings.isBold ? '700' : '400',
      lineHeight: 1.1,
      ...(position === 'top' ? { top: 8 } : { bottom: 8 })
    };

    if (textSettings.textStyle === 'shadow') {
      const s = Math.max(2, scaledWidth);
      base.textShadow = `${s}px ${s}px 4px rgba(0,0,0,.8), ${-s}px ${s}px 4px rgba(0,0,0,.8), ${s}px ${-s}px 4px rgba(0,0,0,.8), ${-s}px ${-s}px 4px rgba(0,0,0,.8)`;
    } else if (textSettings.textStyle === 'outline') {
      const shadows = [];
      for (let x = -scaledWidth; x <= scaledWidth; x++) {
        for (let y = -scaledWidth; y <= scaledWidth; y++) {
          if (x === 0 && y === 0) continue;
          if (Math.abs(x) === scaledWidth || Math.abs(y) === scaledWidth)
            shadows.push(`${x}px ${y}px 0 #000`);
        }
      }
      base.textShadow = shadows.join(', ');
    }
    return base;
  };

  return (
    <div className="canvas-area">
      <div className="canvas-inner">
        <div className="canvas-label">
          <span className="canvas-dot" />
          Live Preview
        </div>

        <div className="meme-frame">
          <img src={imageUrl} className="meme--image" alt="meme" />
          <h2 className="meme--text top" style={getTextStyle('top')}>{topText}</h2>
          <h2 className="meme--text bottom" style={getTextStyle('bottom')}>{bottomText}</h2>
        </div>
      </div>
    </div>
  );
}
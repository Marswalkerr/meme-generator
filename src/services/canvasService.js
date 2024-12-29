// canvasService.js
export async function drawTextOnCanvas(imageURL, topText, bottomText, textSettings) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageURL;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      // Draw image
      ctx.drawImage(img, 0, 0);

      // Configure text style
      const fontStyle = `${textSettings.isItalic ? 'italic ' : ''}${
        textSettings.isBold ? 'bold ' : ''
      }${textSettings.fontSize}px ${textSettings.font}`;
      
      ctx.font = fontStyle;
      ctx.textAlign = textSettings.textAlign;
      ctx.globalAlpha = textSettings.opacity;

      // Function to process text based on settings
      const processText = (text) => textSettings.isAllCaps ? text.toUpperCase() : text;

      // Function to draw text with the selected style
      const drawStyledText = (text, x, y) => {
        if (textSettings.textStyle === 'outline') {
          ctx.strokeStyle = 'black';
          ctx.lineWidth = textSettings.outlineWidth;
          ctx.lineJoin = 'round';
          ctx.strokeText(text, x, y);
          ctx.fillStyle = 'white';
          ctx.fillText(text, x, y);
        } else if (textSettings.textStyle === 'shadow') {
          // Draw shadow layers
          ctx.fillStyle = 'black';
          const shadowOffset = textSettings.outlineWidth;
          
          // Draw shadow in all directions
          [
            [-1, -1], [0, -1], [1, -1],
            [-1, 0],           [1, 0],
            [-1, 1],  [0, 1],  [1, 1]
          ].forEach(([offsetX, offsetY]) => {
            ctx.fillText(
              text, 
              x + (offsetX * shadowOffset), 
              y + (offsetY * shadowOffset)
            );
          });
          
          // Draw main text
          ctx.fillStyle = 'white';
          ctx.fillText(text, x, y);
        } else {
          // No effect, just draw the text
          ctx.fillStyle = 'white';
          ctx.fillText(text, x, y);
        }
      };

      // Calculate x position based on text alignment
      const getXPosition = () => {
        switch(textSettings.textAlign) {
          case 'left': return textSettings.outlineWidth * 2;
          case 'right': return canvas.width - (textSettings.outlineWidth * 2);
          default: return canvas.width / 2;
        }
      };

      // Draw top text
      const topProcessed = processText(topText);
      ctx.textBaseline = 'top';
      drawStyledText(topProcessed, getXPosition(), textSettings.outlineWidth * 2);

      // Draw bottom text
      const bottomProcessed = processText(bottomText);
      ctx.textBaseline = 'bottom';
      drawStyledText(
        bottomProcessed, 
        getXPosition(), 
        canvas.height - (textSettings.outlineWidth * 2)
      );

      resolve(canvas.toDataURL());
    };
  });
}
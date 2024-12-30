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

      // Calculate padding based on image dimensions
      const paddingX = Math.max(20, canvas.width * 0.05);
      const paddingY = Math.max(20, canvas.height * 0.05);

      // Scale outline width based on font size
      const outlineScale = Math.max(textSettings.fontSize / 32, 2);
      const scaledOutlineWidth = textSettings.outlineWidth * outlineScale;

      // Configure text style
      const fontWeight = textSettings.isBold ? 'bold' : 'normal';
      const fontStyle = `${textSettings.isItalic ? 'italic' : ''} ${fontWeight} ${textSettings.fontSize}px ${textSettings.font}`;
      
      ctx.font = fontStyle.trim();
      ctx.textAlign = textSettings.textAlign;
      ctx.globalAlpha = textSettings.opacity;

      const processText = (text) => textSettings.isAllCaps ? text.toUpperCase() : text;

      const drawStyledText = (text, x, y) => {
        if (textSettings.textStyle === 'outline') {
          ctx.strokeStyle = 'black';
          ctx.lineWidth = scaledOutlineWidth;
          ctx.lineJoin = 'round';
          ctx.strokeText(text, x, y);
          ctx.fillStyle = 'white';
          ctx.fillText(text, x, y);
        } else if (textSettings.textStyle === 'shadow') {
          // First draw the shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          const shadowOffset = Math.max(2, scaledOutlineWidth);
          
          // Draw multiple shadow layers for better visibility
          const shadowPositions = [
            [shadowOffset, shadowOffset],
            [-shadowOffset, shadowOffset],
            [shadowOffset, -shadowOffset],
            [-shadowOffset, -shadowOffset]
          ];
          
          shadowPositions.forEach(([offsetX, offsetY]) => {
            ctx.fillText(text, x + offsetX, y + offsetY);
          });

          // Then draw the main text
          ctx.fillStyle = 'white';
          ctx.fillText(text, x, y);
        } else {
          ctx.fillStyle = 'white';
          ctx.fillText(text, x, y);
        }
      };

      const getXPosition = () => {
        switch(textSettings.textAlign) {
          case 'left': return paddingX;
          case 'right': return canvas.width - paddingX;
          default: return canvas.width / 2;
        }
      };

      // Draw top text
      const topProcessed = processText(topText);
      ctx.textBaseline = 'top';
      drawStyledText(topProcessed, getXPosition(), paddingY);

      // Draw bottom text
      const bottomProcessed = processText(bottomText);
      ctx.textBaseline = 'bottom';
      drawStyledText(
        bottomProcessed, 
        getXPosition(), 
        canvas.height - paddingY
      );

      resolve(canvas.toDataURL());
    };
  });
}
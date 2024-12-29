export async function drawTextOnCanvas(imageURL, topText, bottomText) {
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
        ctx.fillStyle = "white";
        ctx.font = "36px impact, sans-serif";
        ctx.textAlign = "center";
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
  
        // Draw top text
        ctx.textBaseline = "top";
        ctx.strokeText(topText, canvas.width / 2, 10);
        ctx.fillText(topText, canvas.width / 2, 10);
  
        // Draw bottom text
        ctx.textBaseline = "bottom";
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 10);
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 10);
  
        resolve(canvas.toDataURL());
      };
    });
  }
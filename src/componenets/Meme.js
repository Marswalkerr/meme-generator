import React, { useState, useEffect } from "react";

// Utility function moved outside component
async function fetchMemeImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL());
    };
  });
}

// Canvas text drawing utility
async function drawTextOnCanvas(imageURL, topText, bottomText) {
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

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });
  const [allMemes, setAllMemes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [generatedMemeURL, setGeneratedMemeURL] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: allMemes[randomNumber].url,
      topText: "",
      bottomText: ""
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }));
  };

  const generateMemeAndShowPopup = async () => {
    try {
      const imageURL = await fetchMemeImage(meme.randomImage);
      const generatedMeme = await drawTextOnCanvas(imageURL, meme.topText, meme.bottomText);
      setGeneratedMemeURL(generatedMeme);
      setShowPopup(true);
    } catch (error) {
      console.error("Error generating meme:", error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = generatedMemeURL || meme.randomImage;
    link.click();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setGeneratedMemeURL(null);
  };

  return (
    <main>
      <div className="form">
        <div className="inputText">
          <input
            type="text"
            placeholder="Top text"
            className="form--input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Bottom text"
            className="form--input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
        <button className="form--button generateBtn" onClick={generateMemeAndShowPopup}>
          Generate Meme
        </button>
      </div>

      <div className="meme-container">
        <div className="meme">
          <img src={generatedMemeURL || meme.randomImage} className="meme--image" alt="Meme" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup--content">
            <img src={generatedMemeURL || meme.randomImage} alt="Generated Meme" className="popup--image" />
            <button className="form--button downloadBtn" onClick={handleDownload}>
              Download Meme
            </button>
            <button className="form--button closeBtn" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
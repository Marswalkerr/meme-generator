import React from "react";

function fetchMemeImage(url) {
  // This is a placeholder function that returns a Promise with a local image as data
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

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });

  const [allMemes, setAllMemes] = React.useState([]);
  const [showPopup, setShowPopup] = React.useState(false);
  const [generatedMemeURL, setGeneratedMemeURL] = React.useState(null); // Add the state variable

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
      topText: "", // Clear the top text
      bottomText: "", // Clear the bottom text
    }));
  }


  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value, // Keep the original case of the entered text
    }));
  }

  async function drawTextOnCanvas(imageURL) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageURL;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Add top text
        ctx.fillStyle = "white";
        ctx.font = "36px impact, sans-serif"; // Use the same font as in CSS
        ctx.textAlign = "center";
        ctx.textBaseline = "top"; // Set the text baseline to top

        ctx.lineWidth = 5;
        ctx.strokeStyle = "black"; // You can change the stroke color as needed
        ctx.strokeText(meme.topText, canvas.width / 2, 10);

        ctx.fillText(meme.topText, canvas.width / 2, 10); // Adjust the vertical position of the top text

        ctx.textBaseline = "bottom"; // Set the text baseline to bottom

        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.strokeText(meme.bottomText, canvas.width / 2, canvas.height - 10);

        ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 10); // Adjust the vertical position of the bottom text

        resolve(canvas.toDataURL());
      };
    });
  }

  async function generateMemeAndShowPopup() {
    try {
      const imageURL = await fetchMemeImage(meme.randomImage);
      const generatedMemeURL = await drawTextOnCanvas(imageURL);

      setGeneratedMemeURL(generatedMemeURL); // Update the generatedMemeURL state

      setShowPopup(true);
    } catch (error) {
      console.error("Error generating meme:", error);
    }
  }

  function handleDownload() {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = generatedMemeURL || meme.randomImage; // Use the generatedMemeURL for download if available
    link.click();
  }

  function handleClosePopup() {
    setShowPopup(false);
    setGeneratedMemeURL(null); // Reset the generatedMemeURL when closing the popup
    //   setMeme((prevMeme) => ({
    //     ...prevMeme,
    //     randomImage: "http://i.imgflip.com/1bij.jpg"
    //   }));
  }

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
        {/* <div className="btnClass"> */}
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
        <button className="form--button generateBtn" onClick={generateMemeAndShowPopup}>
          Generate Meme
        </button>
        {/* </div> */}
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
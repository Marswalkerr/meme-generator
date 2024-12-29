import React, { useState, useEffect } from 'react';
import MemeForm from './MemeForm';
import MemeDisplay from './MemeDisplay';
import MemePopup from './MemePopup';
import { fetchMemes } from '../services/memeService';
import { fetchMemeImage } from '../utils/imageUtils';
import { drawTextOnCanvas } from '../services/canvasService';

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
    fetchMemes().then(setAllMemes);
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
      <MemeForm
        meme={meme}
        onTextChange={handleChange}
        onNewImage={getMemeImage}
        onGenerate={generateMemeAndShowPopup}
      />
      <MemeDisplay
        imageUrl={generatedMemeURL || meme.randomImage}
        topText={meme.topText}
        bottomText={meme.bottomText}
      />
      <MemePopup
        show={showPopup}
        imageUrl={generatedMemeURL || meme.randomImage}
        onDownload={handleDownload}
        onClose={handleClosePopup}
      />
    </main>
  );
}
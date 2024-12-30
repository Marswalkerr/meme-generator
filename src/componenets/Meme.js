import React, { useState, useEffect } from 'react';
import MemeForm from './MemeForm';
import MemeDisplay from './MemeDisplay';
import MemePopup from './MemePopup';
import TextCustomization from './TextCustomization';
import { fetchMemes } from '../services/memeService';
import { fetchMemeImage } from '../utils/imageUtils';
import { drawTextOnCanvas } from '../services/canvasService';

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    textSettings: {
      font: "Impact",
      fontSize: 32,
      isAllCaps: true,
      isBold: false,
      isItalic: false,
      textStyle: "outline", // 'shadow', 'outline', or 'none'
      outlineWidth: 3,
      textAlign: "center",
      verticalAlign: "top",
      opacity: 1
    }
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

  const handleTextSettingsChange = (newSettings) => {
    setMeme(prevMeme => ({
      ...prevMeme,
      textSettings: {
        ...prevMeme.textSettings,
        ...newSettings
      }
    }));
  };

  const generateMemeAndShowPopup = async () => {
    try {
      const imageURL = await fetchMemeImage(meme.randomImage);
      const generatedMeme = await drawTextOnCanvas(
        imageURL, 
        meme.topText, 
        meme.bottomText, 
        meme.textSettings
      );
      setGeneratedMemeURL(generatedMeme);
      setShowPopup(true);
    } catch (error) {
      console.error("Error generating meme:", error);
    }
  };

  return (
    <main>
      <div className='container'>
        <div className="meme-editor">
          <MemeDisplay
            imageUrl={generatedMemeURL || meme.randomImage}
            topText={meme.topText}
            bottomText={meme.bottomText}
            textSettings={meme.textSettings}
            onNewImage={getMemeImage}
          />
          
          <div className="editor-controls">
            <MemeForm
              meme={meme}
              onTextChange={handleChange}
              onGenerate={generateMemeAndShowPopup}
              onReset={() => setMeme(prevMeme => ({
                ...prevMeme,
                topText: "",
                bottomText: ""
              }))}
            />
            
            <TextCustomization
              settings={meme.textSettings}
              onSettingsChange={handleTextSettingsChange}
            />
          </div>
        </div>

        <MemePopup
          show={showPopup}
          imageUrl={generatedMemeURL || meme.randomImage}
          onDownload={() => {
            const link = document.createElement("a");
            link.download = "meme.png";
            link.href = generatedMemeURL || meme.randomImage;
            link.click();
          }}
          onClose={() => {
            setShowPopup(false);
            setGeneratedMemeURL(null);
          }}
        />
      </div>
    </main>
  );
}
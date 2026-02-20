import React, { useState, useEffect } from 'react';
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
      fontSize: 36,
      isAllCaps: true,
      isBold: false,
      isItalic: false,
      textStyle: "outline",
      outlineWidth: 3,
      textAlign: "center",
      opacity: 1
    }
  });
  const [allMemes, setAllMemes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [generatedMemeURL, setGeneratedMemeURL] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState(null);

  useEffect(() => { fetchMemes().then(setAllMemes); }, []);

  const pickImage = (url) => {
    setSelectedUrl(url);
    setGeneratedMemeURL(null);
    setMeme(p => ({ ...p, randomImage: url, topText: "", bottomText: "" }));
  };

  const randomImage = () => {
    if (!allMemes.length) return;
    const url = allMemes[Math.floor(Math.random() * allMemes.length)].url;
    pickImage(url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeme(p => ({ ...p, [name]: value }));
  };

  const handleSettings = (s) => {
    setMeme(p => ({ ...p, textSettings: { ...p.textSettings, ...s } }));
  };

  const generate = async () => {
    try {
      const imageURL = await fetchMemeImage(meme.randomImage);
      const result = await drawTextOnCanvas(imageURL, meme.topText, meme.bottomText, meme.textSettings);
      setGeneratedMemeURL(result);
      setShowPopup(true);
    } catch (err) {
      console.error("Error generating meme:", err);
    }
  };

  const download = () => {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = generatedMemeURL || meme.randomImage;
    link.click();
  };

  return (
    <div className="editor-layout">

      {/* ── LEFT SIDEBAR: Gallery + Text Inputs ── */}
      <aside className="sidebar">
        {/* Gallery */}
        <div className="panel-section">
          <p className="panel-label">Templates</p>
          <div className="gallery-grid">
            {allMemes.map(m => (
              <img
                key={m.id}
                src={m.url}
                alt={m.name}
                className={`gallery-thumb${selectedUrl === m.url ? ' active' : ''}`}
                onClick={() => pickImage(m.url)}
              />
            ))}
          </div>
          <button className="btn btn-random" style={{ marginTop: 10 }} onClick={randomImage}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
              <polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
            </svg>
            Random Template
          </button>
        </div>

        {/* Text Inputs */}
        <div className="panel-section">
          <p className="panel-label">Caption</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="field">
              <label className="field-label">Top Text</label>
              <input
                className="text-input"
                type="text"
                name="topText"
                placeholder="Enter top text…"
                value={meme.topText}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label className="field-label">Bottom Text</label>
              <input
                className="text-input"
                type="text"
                name="bottomText"
                placeholder="Enter bottom text…"
                value={meme.bottomText}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Generate / Reset */}
        <div className="panel-section">
          <button className="btn btn-green" onClick={generate}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Generate &amp; Preview
          </button>
          <div className="btn-row" style={{ marginTop: 8 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }}
              onClick={() => setMeme(p => ({ ...p, topText: "", bottomText: "" }))}>
              Clear Text
            </button>
          </div>
        </div>
      </aside>

      {/* ── CENTER: Canvas Preview ── */}
      <MemeDisplay
        imageUrl={meme.randomImage}
        topText={meme.topText}
        bottomText={meme.bottomText}
        textSettings={meme.textSettings}
      />

      {/* ── RIGHT SIDEBAR: Text Customization ── */}
      <aside className="sidebar-right">
        <TextCustomization
          settings={meme.textSettings}
          onSettingsChange={handleSettings}
        />
      </aside>

      {/* ── POPUP ── */}
      <MemePopup
        show={showPopup}
        imageUrl={generatedMemeURL || meme.randomImage}
        onDownload={download}
        onClose={() => { setShowPopup(false); setGeneratedMemeURL(null); }}
      />
    </div>
  );
}
import React from 'react';

export default function MemePopup({ show, imageUrl, onDownload, onClose }) {
  if (!show) return null;
  
  return (
    <div className="popup">
      <div className="popup--content">
        <img src={imageUrl} alt="Generated Meme" className="popup--image" />
        <button className="form--button downloadBtn" onClick={onDownload}>
          Download Meme
        </button>
        <button className="form--button closeBtn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
import React from 'react';

export default function MemePopup({ show, imageUrl, onDownload, onClose }) {
  if (!show) return null;

  return (
    <div className="popup" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="popup--content">
        <div className="popup-top">
          <span className="popup-title">🎉 Meme Ready!</span>
          <button className="popup-close" onClick={onClose}>✕</button>
        </div>

        <img src={imageUrl} alt="Generated meme" className="popup--image" />

        <div className="popup-actions">
          <button className="btn btn-download" onClick={onDownload}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PNG
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
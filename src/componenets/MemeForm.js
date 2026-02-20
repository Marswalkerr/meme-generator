export default function MemeForm({ meme, onTextChange, onGenerate, onReset }) {
  return (
    <div className="form-card">
      <p className="form-card-title">Meme Text</p>
      <div className="form">
        <div className="inputText">
          <div className="input-wrapper">
            <label className="input-label">Top Text</label>
            <input
              type="text"
              placeholder="Enter top text..."
              className="form--input"
              name="topText"
              value={meme.topText}
              onChange={onTextChange}
            />
          </div>
          <div className="input-wrapper">
            <label className="input-label">Bottom Text</label>
            <input
              type="text"
              placeholder="Enter bottom text..."
              className="form--input"
              name="bottomText"
              value={meme.bottomText}
              onChange={onTextChange}
            />
          </div>
        </div>

        <div className="btnContainer">
          <button className="btn generateBtn" onClick={onGenerate}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Generate Meme
          </button>
          <button className="btn resetBtn" onClick={onReset}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
            </svg>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MemeForm({ meme, onTextChange, onGenerate, onReset }) {
  return (
    <div className="form">
      <div className="inputText">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={onTextChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={onTextChange}
        />
      </div>
      <div className="btnContainer">
        <button className="form--button generateBtn" onClick={onGenerate}>
          Generate Meme
        </button>
        <button className="form--button resetBtn" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

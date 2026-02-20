import React from 'react';

const TextCustomization = ({ settings, onSettingsChange }) => {
  const set = (k, v) => onSettingsChange({ [k]: v });

  return (
    <>
      {/* Font */}
      <div className="panel-section">
        <p className="panel-label">Font</p>
        <select
          className="styled-select"
          value={settings.font}
          onChange={e => set('font', e.target.value)}
        >
          <option value="Impact">Impact</option>
          <option value="Arial">Arial</option>
          <option value="Comic Sans MS">Comic Sans</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>

      {/* Size */}
      <div className="panel-section">
        <p className="panel-label">Font Size</p>
        <div className="slider-wrap">
          <input type="range" min="12" max="72"
            value={settings.fontSize}
            onChange={e => set('fontSize', +e.target.value)}
          />
          <span className="slider-val">{settings.fontSize}px</span>
        </div>
      </div>

      {/* Format */}
      <div className="panel-section">
        <p className="panel-label">Format</p>
        <div className="chip-row">
          {[
            { key: 'isAllCaps', label: 'CAPS' },
            { key: 'isBold',    label: 'Bold' },
            { key: 'isItalic',  label: 'Italic' },
          ].map(({ key, label }) => (
            <label key={key} className="chip-label">
              <input
                type="checkbox"
                checked={settings[key]}
                onChange={e => set(key, e.target.checked)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Text Effect */}
      <div className="panel-section">
        <p className="panel-label">Text Effect</p>
        <div className="seg-ctrl">
          {['outline', 'shadow', 'none'].map(v => (
            <label key={v} className="seg-label">
              <input
                type="radio"
                name="textStyle"
                value={v}
                checked={settings.textStyle === v}
                onChange={e => set('textStyle', e.target.value)}
              />
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Effect Width */}
      <div className="panel-section">
        <p className="panel-label">Effect Strength</p>
        <div className="slider-wrap">
          <input type="range" min="1" max="10"
            value={settings.outlineWidth}
            onChange={e => set('outlineWidth', +e.target.value)}
          />
          <span className="slider-val">{settings.outlineWidth}</span>
        </div>
      </div>

      {/* Alignment */}
      <div className="panel-section">
        <p className="panel-label">Alignment</p>
        <div className="seg-ctrl">
          {[
            { v: 'left',   icon: '⬅' },
            { v: 'center', icon: '↔' },
            { v: 'right',  icon: '➡' },
          ].map(({ v, icon }) => (
            <label key={v} className="seg-label">
              <input
                type="radio"
                name="textAlign"
                value={v}
                checked={settings.textAlign === v}
                onChange={e => set('textAlign', e.target.value)}
              />
              {icon}
            </label>
          ))}
        </div>
      </div>

      {/* Opacity */}
      <div className="panel-section">
        <p className="panel-label">Opacity</p>
        <div className="slider-wrap">
          <input type="range" min="0" max="1" step="0.05"
            value={settings.opacity}
            onChange={e => set('opacity', +e.target.value)}
          />
          <span className="slider-val">{Math.round(settings.opacity * 100)}%</span>
        </div>
      </div>
    </>
  );
};

export default TextCustomization;
// TextCustomization.js
import React from 'react';

const TextCustomization = ({ settings, onSettingsChange }) => {
  const handleChange = (name, value) => {
    onSettingsChange({ [name]: value });
  };

  return (
    <div className="text-customization">
      <div className="customization-group">
        <label>Font</label>
        <select 
          value={settings.font}
          onChange={(e) => handleChange('font', e.target.value)}
        >
          <option value="Impact">Impact</option>
          <option value="Arial">Arial</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
        </select>
      </div>

      <div className="customization-group">
        <label>
          <input
            type="checkbox"
            checked={settings.isAllCaps}
            onChange={(e) => handleChange('isAllCaps', e.target.checked)}
          />
          ALL CAPS
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.isBold}
            onChange={(e) => handleChange('isBold', e.target.checked)}
          />
          Bold
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.isItalic}
            onChange={(e) => handleChange('isItalic', e.target.checked)}
          />
          Italic
        </label>
      </div>

      <div className="customization-group">
        <label>Style</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="textStyle"
              value="shadow"
              checked={settings.textStyle === 'shadow'}
              onChange={(e) => handleChange('textStyle', e.target.value)}
            />
            Shadow
          </label>
          <label>
            <input
              type="radio"
              name="textStyle"
              value="outline"
              checked={settings.textStyle === 'outline'}
              onChange={(e) => handleChange('textStyle', e.target.value)}
            />
            Outline
          </label>
          <label>
            <input
              type="radio"
              name="textStyle"
              value="none"
              checked={settings.textStyle === 'none'}
              onChange={(e) => handleChange('textStyle', e.target.value)}
            />
            None
          </label>
        </div>
      </div>

      <div className="customization-group">
        <label>Outline Width</label>
        <input
          type="number"
          value={settings.outlineWidth}
          onChange={(e) => handleChange('outlineWidth', parseInt(e.target.value))}
          min="1"
          max="10"
        />
      </div>

      <div className="customization-group">
        <label>Font Size</label>
        <input
          type="number"
          value={settings.fontSize}
          onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
          min="12"
          max="72"
        />
      </div>

      <div className="customization-group">
        <label>Text Align</label>
        <select 
          value={settings.textAlign}
          onChange={(e) => handleChange('textAlign', e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div className="customization-group">
        <label>Opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={settings.opacity}
          onChange={(e) => handleChange('opacity', parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default TextCustomization;
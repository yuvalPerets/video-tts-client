import React from 'react';
import { QUALITY_PRESETS } from '../utils/videoOptimizer';

const QualitySelector = ({ selectedQuality, onQualityChange, isProcessing }) => {
  return (
    <div>
      <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'white', marginBottom: '0.5rem', display: 'block' }}>
        Video Quality
      </label>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {Object.entries(QUALITY_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            type="button"
            disabled={isProcessing}
            onClick={() => onQualityChange(key)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedQuality === key ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${selectedQuality === key ? '#8b5cf6' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '0.5rem',
              color: 'white',
              fontSize: '0.875rem',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.5 : 1,
              transition: 'all 0.3s ease',
              flex: '1',
              minWidth: '120px'
            }}
          >
            <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
              {preset.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              Max {preset.maxResolution}p • {(preset.maxBitrate / 1000000).toFixed(0)}Mbps
            </div>
          </button>
        ))}
      </div>
      <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
        Quality affects processing speed and output file size
      </p>
    </div>
  );
};

export default QualitySelector;

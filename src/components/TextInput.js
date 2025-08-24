import React from 'react';

const TextInput = ({ text, onTextChange }) => {
  return (
    <div>
      <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'white', marginBottom: '0.5rem', display: 'block' }}>
        TTS Text
      </label>
      <textarea
        placeholder="Enter the text you want to convert to speech and add to your video..."
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '0.75rem',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '0.5rem',
          color: 'white',
          resize: 'none',
          fontSize: '0.875rem'
        }}
        required
      />
      <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
        {text.length} characters
      </p>
    </div>
  );
};

export default TextInput;

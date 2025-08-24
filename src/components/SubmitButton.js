import React from 'react';

const SubmitButton = ({ downloading, videoFile, text, onSubmit }) => {
  const isDisabled = downloading || !videoFile || !text.trim();

  return (
    <button
      type="submit"
      disabled={isDisabled}
      onClick={onSubmit}
      style={{
        width: '100%',
        background: isDisabled ? 
          'rgba(255, 255, 255, 0.1)' : 
          'linear-gradient(135deg, #8b5cf6, #3b82f6)',
        color: 'white',
        fontWeight: '500',
        padding: '1.5rem',
        fontSize: '1.125rem',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
        transition: 'all 0.3s ease'
      }}
    >
      {downloading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '1.25rem', 
            height: '1.25rem', 
            border: '2px solid white',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Processing...
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          📥 Process Video
        </div>
      )}
    </button>
  );
};

export default SubmitButton;

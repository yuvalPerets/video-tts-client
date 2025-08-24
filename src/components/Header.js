import React from 'react';

const Header = () => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        marginBottom: '1rem',
        background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        🎬
      </div>
      <h1 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #a78bfa, #60a5fa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.5rem'
      }}>
        Video TTS Processor
      </h1>
      <p style={{ color: '#9ca3af' }}>
        Upload your video and add AI-generated voice narration
      </p>
    </div>
  );
};

export default Header;

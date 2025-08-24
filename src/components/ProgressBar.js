import React from 'react';

const ProgressBar = ({ downloading, message, progress }) => {
  const getProgressPercent = () => {
    if (progress.complete) return 100;
    if (progress.processing) return 85;
    return progress.upload;
  };

  if (!downloading) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ 
          width: '1.25rem', 
          height: '1.25rem', 
          border: '2px solid #8b5cf6',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>{message}</span>
      </div>
      
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          <span style={{ color: 'white' }}>Progress</span>
          <span style={{ color: 'white' }}>{getProgressPercent()}%</span>
        </div>
        <div style={{
          width: '100%',
          height: '0.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '0.25rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${getProgressPercent()}%`,
            height: '100%',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            transition: 'width 0.5s ease'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

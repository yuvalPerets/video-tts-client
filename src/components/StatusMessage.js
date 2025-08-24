import React from 'react';

const StatusMessage = ({ message, downloading }) => {
  if (!message || downloading) return null;

  return (
    <div style={{
      textAlign: 'center',
      padding: '1rem',
      borderRadius: '0.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <span style={{ fontSize: '0.875rem', color: 'white' }}>{message}</span>
    </div>
  );
};

export default StatusMessage;
